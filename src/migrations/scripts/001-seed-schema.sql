
INSERT INTO public.users (id,firstname,lastname,email,passwordhash,createddate,updateddate,deleteddate) VALUES
	 ('1d7b054b-2d78-4f16-a72d-3eae28c1deaa'::uuid,'Admin','Softo','admin@sof.to','$2a$13$SAbjFTuB.fY8kkSLe5/aTua/4KlpPJ8ZCCPMm9x3msHY.q1mwMIJ6','2020-12-02 20:26:51.595','2020-12-02 20:43:26.395',NULL),
	 ('18e43bac-0ad3-4bfb-af2e-cb961e245aea'::uuid,'User','Softo','user@sof.to','$2a$13$SAbjFTuB.fY8kkSLe5/aTua/4KlpPJ8ZCCPMm9x3msHY.q1mwMIJ6','2020-12-02 20:26:51.595','2020-12-02 20:43:26.395',NULL);

INSERT INTO public.products (id,userid,createddate,updateddate,deleteddate,"name",price) VALUES
     ('44db805d-7ac3-4a28-85f1-9a907e1eeb63'::uuid,'1d7b054b-2d78-4f16-a72d-3eae28c1deaa','2020-12-02 03:00:00.000','2020-12-02 20:43:26.395',NULL,'Product01',53.54),
     ('b985238f-1db1-476b-8f85-0a0f68707e8f'::uuid,'18e43bac-0ad3-4bfb-af2e-cb961e245aea','2020-12-02 03:00:00.000', '2020-12-02 20:43:26.395', NULL,'Product02',63.52)

