-- Database generated with pgModeler (PostgreSQL Database Modeler).
-- pgModeler  version: 0.9.3-beta1
-- PostgreSQL version: 13.0
-- Project Site: pgmodeler.io
-- Model Author: ---
-- object: admin_projeto | type: ROLE --
DROP ROLE IF EXISTS admin_projeto;
CREATE ROLE admin_projeto WITH SUPERUSER ENCRYPTED PASSWORD 'softo123';
-- ddl-end --


-- Database creation must be performed outside a multi lined SQL file.
-- These commands were put in this file only as a convenience.
--
-- object: "softo_db" | type: DATABASE --
-- DROP DATABASE IF EXISTS "softo_db";
--CREATE DATABASE "softo_db";
-- ddl-end --


-- object: public.users | type: TABLE --
-- DROP TABLE IF EXISTS public.users CASCADE;
CREATE TABLE public.users (
	id uuid NOT NULL,
	alternativeid bigint NOT NULL GENERATED ALWAYS AS IDENTITY ,
	firstname varchar(200) NOT NULL,
	lastname varchar(200) NOT NULL,
	email varchar(300) NOT NULL,
	passwordhash varchar,
	createddate timestamp with time zone NOT NULL,
	updateddate timestamp with time zone,
	deleteddate timestamp with time zone,
	CONSTRAINT pk_users PRIMARY KEY (id)

);
-- ddl-end --
ALTER TABLE public.users OWNER TO admin_projeto;
-- ddl-end --


CREATE TABLE public.products (
    id uuid NOT NULL,
	alternativeid bigint NOT NULL GENERATED ALWAYS AS IDENTITY ,
	userid uuid NOT NULL,
    createddate timestamp with time zone NOT NULL,
	updateddate timestamp with time zone,
	deleteddate timestamp with time zone,
    name varchar(30) NOT NULL,
    price numeric (10,2) NOT NULL,
    CONSTRAINT pk_products PRIMARY KEY (id)

);
-- ddl-end --
ALTER TABLE public.products OWNER TO admin_projeto;
-- ddl-end --

ALTER TABLE public.products ADD CONSTRAINT fk_user_products FOREIGN KEY (userid)
REFERENCES public.users (id) MATCH FULL
ON DELETE RESTRICT ON UPDATE RESTRICT;

