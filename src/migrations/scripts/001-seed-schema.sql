INSERT INTO public.languages (id,"name",isocode,createddate,updateddate,deleteddate) VALUES
	 ('354ebebe-e736-4358-ae75-5995e2a61714','Português','pt_BR','2020-11-11 07:10:10-03',NULL,NULL),
	 ('c05ae051-b4ed-4226-8ae6-2de27e982256','Español','es','2020-11-11 07:10:10-03',NULL,NULL),
	 ('6dd278b7-57ce-4fb8-aee2-67e0ffb43ce9','English','en_US','2020-11-11 07:10:10-03',NULL,NULL);

INSERT INTO public.timezones (id,"name",isocode,createddate,updateddate,deleteddate) VALUES
	 ('1fabf17f-1d05-4646-9190-900d9858deb2','America/Sao_Paulo','BR','2020-11-25 12:13:10.435-03',NULL,NULL);

INSERT INTO public.tenants (id,"name",imageuploadeddate,createddate,updateddate,deleteddate,defaulttimezoneid,defaultlanguageid,defaultcurrencyid) VALUES
	 ('b985238f-1db1-476b-8f85-0a0f68707e8f','default',NULL,'2020-11-25 12:18:06.117-03',NULL,NULL,'1fabf17f-1d05-4646-9190-900d9858deb2','354ebebe-e736-4358-ae75-5995e2a61714',NULL);

INSERT INTO public.roles (id,tenantid ,"name",createddate,updateddate,deleteddate) VALUES
	 ('300b92ed-850a-47cd-9134-1bcd2fa678fd','b985238f-1db1-476b-8f85-0a0f68707e8f','Administrator','2020-12-02 00:00:00-03',NULL,NULL),
	 ('353bb163-531a-4a2f-9a3e-04aae6a24587','b985238f-1db1-476b-8f85-0a0f68707e8f','User','2020-12-02 00:00:00-03',NULL,NULL);

INSERT INTO public.users (id,tenantid,languageid,timezoneid,firstname,lastname,email,emailconfirmeddate,passwordhash,securitystamp,accessfailedcount,lockoutenddate,adminblockeddate,avatarimageuploadeddate,createddate,updateddate,deleteddate) VALUES
	 ('1d7b054b-2d78-4f16-a72d-3eae28c1deaa'::uuid,'b985238f-1db1-476b-8f85-0a0f68707e8f'::uuid,'354ebebe-e736-4358-ae75-5995e2a61714'::uuid,'1fabf17f-1d05-4646-9190-900d9858deb2'::uuid,'Admin','Softo','admin@sof.to','2020-12-02 20:26:51.595','$2a$13$stA/btfvQjoNhOz3TG.V4uYZCskn9qUl95z8m5K.xp5fRhW0drGZ2','b90e0b55-f7d2-4c22-bba0-dc7248beba81'::uuid,0,NULL,NULL,NULL,'2020-12-02 03:00:00.000','2020-12-02 20:43:26.395',NULL),
	 ('18e43bac-0ad3-4bfb-af2e-cb961e245aea'::uuid,'b985238f-1db1-476b-8f85-0a0f68707e8f'::uuid,'354ebebe-e736-4358-ae75-5995e2a61714'::uuid,'1fabf17f-1d05-4646-9190-900d9858deb2'::uuid,'User','Softo','user@sof.to','2020-12-02 20:26:51.595','$2a$13$stA/btfvQjoNhOz3TG.V4uYZCskn9qUl95z8m5K.xp5fRhW0drGZ2','27e83e47-b275-4bd0-a569-58ecbae3c4d7'::uuid,0,NULL,NULL,NULL,'2020-12-02 03:00:00.000','2020-12-02 20:43:26.395',NULL);

-- SOS
INSERT INTO public.userroles (id,userid,roleid,createddate,updateddate,deleteddate) VALUES
	 ('8f936a61-0c33-43a5-98ea-1b702ac6af33'::uuid,'1d7b054b-2d78-4f16-a72d-3eae28c1deaa'::uuid,'300b92ed-850a-47cd-9134-1bcd2fa678fd'::uuid,'2020-12-02 03:00:00.000',NULL,NULL),
	 ('e3e95755-dba9-4120-b1c7-fea846419aca'::uuid,'18e43bac-0ad3-4bfb-af2e-cb961e245aea'::uuid,'353bb163-531a-4a2f-9a3e-04aae6a24587'::uuid,'2020-12-02 03:00:00.000',NULL,NULL);
-- SOS

INSERT INTO public.products (id,userid,createddate,updateddate,deleteddate,"name",price) VALUES
     (''::uuid,''::uuid,'2020-12-02 03:00:00.000',NULL,NULL,'Product01',50)
     ()
    
INSERT INTO public.tenantlanguages (id,tenantid,languageid,isactive,createddate,updateddate,deleteddate) VALUES
	 ('c3426517-d5a4-4ba3-b242-a878a7e97078'::uuid,'b985238f-1db1-476b-8f85-0a0f68707e8f'::uuid,'354ebebe-e736-4358-ae75-5995e2a61714'::uuid,true,'2021-11-27 12:51:20.042',NULL,NULL);

INSERT INTO public.generalfunctionalities (id,name,tag,description,createddate,updateddate,deleteddate) VALUES
	 ('84bbeaf5-f4fc-4e30-aeb1-9f02063a0009'::uuid,'Create User','createUser','User with this functionality can create other users.','2021-12-06 14:23:09.159',NULL,NULL),
	 ('315ede31-e89b-4276-9732-65928088df31'::uuid,'Read User','readUser','User with this functionality can read other users info.','2021-12-06 14:23:09.159',NULL,NULL),
	 ('f1144deb-4acf-4a5a-8448-ff5406479f5f'::uuid,'Update User','updateUser','User with this functionality can update other users.','2021-12-06 14:23:09.159',NULL,NULL),
	 ('dd13b544-9832-4440-9d42-28481b71b857'::uuid,'Delete User','deleteUser','User with this functionality can delete other users.','2021-12-06 14:23:09.159',NULL,NULL);

INSERT INTO public.rolefunctionalities (id,roleid,generalfunctionalityid,createddate,updateddate,deleteddate) VALUES
	 ('44db805d-7ac3-4a28-85f1-9a907e1eeb63'::uuid,'300b92ed-850a-47cd-9134-1bcd2fa678fd'::uuid,'84bbeaf5-f4fc-4e30-aeb1-9f02063a0009'::uuid,'2021-12-06 14:23:09.159',NULL,NULL),
	 ('a369c253-ee8a-4b06-98b0-79ddc178e30d'::uuid,'300b92ed-850a-47cd-9134-1bcd2fa678fd'::uuid,'315ede31-e89b-4276-9732-65928088df31'::uuid,'2021-12-06 14:23:09.159',NULL,NULL),
	 ('b6af42c9-e214-409f-a9c7-bc9ae5790a17'::uuid,'300b92ed-850a-47cd-9134-1bcd2fa678fd'::uuid,'f1144deb-4acf-4a5a-8448-ff5406479f5f'::uuid,'2021-12-06 14:23:09.159',NULL,NULL),
	 ('59a497c2-814c-4b72-97a0-cbb901c5c360'::uuid,'300b92ed-850a-47cd-9134-1bcd2fa678fd'::uuid,'dd13b544-9832-4440-9d42-28481b71b857'::uuid,'2021-12-06 14:23:09.159',NULL,NULL);
