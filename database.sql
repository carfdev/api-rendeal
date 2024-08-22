create table Rols (
  id bigint primary key generated always as identity,
  rol text not null
);

create table Admins (
  id uuid primary key default gen_random_uuid (),
  email text not null unique,
  password text not null,
  rol_id bigint not null references Rols (id)
);

create table Workers (
  id uuid primary key default gen_random_uuid (),
  email text not null unique,
  password text not null,
  name text not null,
  surname text not null,
  phone text,
  tin text,
  address text,
  postal_code text,
  city text,
  bank_account text,
  employment text,
  employment_type text,
  employment_date date,
  salary numeric,
  salary_type text,
  rol_id bigint not null references Rols (id)
);

create table Clients (
  id uuid primary key default gen_random_uuid (),
  email text not null unique,
  password text not null,
  name text not null,
  surname text not null,
  phone text,
  tin text,
  address text,
  postal_code text,
  city text,
  client_type text check (client_type in ('private', 'company')),
  price numeric,
  work_hours text,
  work_frequency text,
  work_area text,
  worker_id uuid not null references Workers (id),
  rol_id bigint not null references Rols (id)
);

create table Invoices (
  id uuid primary key default gen_random_uuid (),
  amount numeric not null,
  ocr text not null,
  bank_transfer_number text not null,
  month text not null,
  creation_date date not null,
  expiration_date date not null,
  worker_id uuid not null references Workers (id),
  client_id uuid not null references Clients (id)
);

alter table Clients
drop constraint clients_worker_id_fkey;

alter table Clients
add constraint clients_worker_id_fkey foreign key (worker_id) references workers (id) on delete cascade;

alter table Invoices
drop constraint invoices_worker_id_fkey;

alter table Invoices
add constraint invoices_worker_id_fkey foreign key (worker_id) references workers (id) on delete cascade;

alter table Invoices
drop constraint invoices_client_id_fkey;

alter table Invoices
add constraint invoices_client_id_fkey foreign key (client_id) references clients (id) on delete cascade;