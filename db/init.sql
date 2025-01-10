drop view if exists echipamente_detaliate;
drop view if exists total_comenzi;

drop table if exists canale_configurari;
drop table if exists canal;
drop table if exists configurari_comandate;
drop table if exists configurare;
drop table if exists echipament;
drop table if exists model;
drop table if exists tehnician;
drop table if exists comanda;
drop table if exists client;

drop type if exists valoare_putere;
drop type if exists valoare_metoda_plata;


create table client
(
    cif_client    numeric(8) primary key check ( cif_client > 0 ),
    denumire      varchar(50)  not null unique,
    platitor_tva  boolean      not null,
    email         varchar(254) not null unique check ( email ~ '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}' ),
    judet         varchar(50)  not null,
    localitate    varchar(50)  not null,
    strada        varchar(50)  not null,
    numar_stradal integer check ( numar_stradal > 0 )
);

create table model
(
    id_model           integer primary key generated always as identity,
    producator         varchar(50)   not null,
    denumire           varchar(20)   not null,
    capacitate_baterie integer check ( capacitate_baterie > 0 ),
    putere             numeric(6, 1) not null check ( putere > 0 ),
    unique (producator, denumire)
);

create table echipament
(
    id_echipament  integer primary key generated always as identity,
    nr_serie       varchar(25)    not null unique,
    data_achizitie date           not null default now() check ( data_achizitie <= now()),
    pret_achizitie numeric(10, 2) not null check ( pret_achizitie > 0 ),
    garantie       smallint check ( garantie > 0 and garantie <= 60 ),
    cod_model      integer        not null,
    constraint fk_model foreign key (cod_model) references model (id_model) on delete restrict
);

create table tehnician
(
    id_tehnician  integer primary key generated always as identity,
    cnp           char(13)       not null unique check ( cnp ~ '^[1-8]\d{12}$'),
    nume          varchar(50)    not null,
    prenume       varchar(50)    not null,
    numar_telefon varchar(15)    not null unique check ( numar_telefon ~ '^\+?\d{10,}$' ),
    data_angajare date           not null default now() check ( data_angajare <= now() ),
    salariu       numeric(10, 2) not null check ( salariu > 0 )
);

create table canal
(
    id_canal  integer primary key generated always as identity,
    frecventa numeric(9, 6) not null check ( frecventa between 400 and 470),
    digital   boolean       not null default false,
    criptat   boolean       not null default false,
    constraint vf_criptat_necesita_digital check ( digital = true or criptat = false )
);

create type valoare_putere as enum ('low', 'high');

create table configurare
(
    id_configurare     integer primary key generated always as identity,
    moment_configurare timestamp with time zone not null default now() check ( moment_configurare <= now() ),
    putere             valoare_putere           not null default 'low',
    prioritate         smallint                 not null default 0 check ( prioritate between 0 and 2),
    cod_echipament     integer                  not null,
    cod_tehnician      integer,
    constraint fk_tehnician foreign key (cod_tehnician) references tehnician (id_tehnician) on delete set null,
    constraint fk_echipament foreign key (cod_echipament) references echipament (id_echipament) on delete cascade
);

create table canale_configurari
(
    cod_configurare integer     not null,
    constraint fk_configurare foreign key (cod_configurare) references configurare (id_configurare) on delete restrict,
    cod_canal       integer     not null,
    constraint fk_canal foreign key (cod_canal) references canal (id_canal) on delete cascade,
    primary key (cod_configurare, cod_canal),
    pozitie_canal   smallint    not null check ( pozitie_canal > 0 ),
    denumire        varchar(15) not null,
    unique (cod_configurare, denumire)
);

create type valoare_metoda_plata as enum ('numerar', 'transfer_bancar');

create table comanda
(
    id_comanda      integer primary key generated always as identity,
    metoda_plata    valoare_metoda_plata not null,
    data_inchiriere date                 not null check ( data_inchiriere < now() ),
    data_returnare  date check ( data_returnare < now() ),
    discount        numeric(2, 2) check ( discount > 0 ),
    cost_daune      numeric(10, 2) check ( cost_daune > 0 ),
    cif_client      numeric(8),
    constraint fk_client foreign key (cif_client) references client (cif_client) on delete set null,
    constraint vf_data_returnare check ( data_returnare > comanda.data_inchiriere ),
    constraint vf_discount check ( cost_daune is null or discount is null )
);

create table configurari_comandate
(
    cod_comanda     integer,
    constraint fk_inchiriere foreign key (cod_comanda) references comanda (id_comanda) on delete restrict,
    cod_configurare integer,
    constraint fk_configurare foreign key (cod_configurare) references configurare (id_configurare) on delete restrict,
    primary key (cod_comanda, cod_configurare),
    pret            numeric(10, 2) check ( pret > 0 )
);

create or replace view echipamente_detaliate as
select e.*, m.*
from echipament e
         join model m on e.cod_model = m.id_model;

create or replace rule update_echipamente_detaliate as
    on update to echipamente_detaliate
    do instead (
    update echipament
    set nr_serie       = NEW.nr_serie,
        data_achizitie = NEW.data_achizitie,
        pret_achizitie = NEW.pret_achizitie,
        garantie       = NEW.garantie,
        cod_model      = NEW.cod_model
    where id_echipament = OLD.id_echipament;
    );

create or replace rule delete_echipamente_detaliate as
    on delete to echipamente_detaliate do instead (
    delete
    from echipament
    where id_echipament = old.id_echipament;
    );

create or replace view total_comenzi as
select c.id_comanda,
       cl.denumire                                as denumire_client,
       (c.data_returnare - c.data_inchiriere + 1) as zile_inchiriate,
       sum((c.data_returnare - c.data_inchiriere + 1) * cc.pret) * (1 - coalesce(c.discount, 0)) +
       coalesce(c.cost_daune, 0)                  as total
from comanda c
         left join configurari_comandate cc on c.id_comanda = cc.cod_comanda
         left join client cl on c.cif_client = cl.cif_client
where c.data_returnare is not null
group by cc.cod_comanda, cl.denumire, c.id_comanda;

-- select c.id_comanda, c.data_inchiriere, count(cc), count(chc)
select c.id_comanda,
       c.data_inchiriere,
       count(distinct cc.cod_configurare) as configurari_folosite,
       count(distinct chc.cod_canal)      as canale_folosite
from comanda c
         left join configurari_comandate cc on c.id_comanda = cc.cod_comanda
         left join canale_configurari chc on cc.cod_configurare = chc.cod_configurare
group by c.id_comanda
having count(distinct chc.cod_canal) >=2;

