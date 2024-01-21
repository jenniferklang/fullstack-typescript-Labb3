--
-- PostgreSQL database dump
--

-- Dumped from database version 16.0
-- Dumped by pg_dump version 16.0

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: entries; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.entries (
    entry_id integer NOT NULL,
    user_id integer NOT NULL,
    entry_date date NOT NULL,
    content text NOT NULL,
    symptoms text,
    meal text
);


ALTER TABLE public.entries OWNER TO postgres;

--
-- Name: entries_entry_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.entries_entry_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.entries_entry_id_seq OWNER TO postgres;

--
-- Name: entries_entry_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.entries_entry_id_seq OWNED BY public.entries.entry_id;


--
-- Name: symptoms; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.symptoms (
    symptom_id integer NOT NULL,
    name character varying(255) NOT NULL,
    pain_intensity integer NOT NULL,
    CONSTRAINT symptoms_rating_check CHECK (((pain_intensity >= 0) AND (pain_intensity <= 5)))
);


ALTER TABLE public.symptoms OWNER TO postgres;

--
-- Name: symptoms_symptom_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.symptoms_symptom_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.symptoms_symptom_id_seq OWNER TO postgres;

--
-- Name: symptoms_symptom_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.symptoms_symptom_id_seq OWNED BY public.symptoms.symptom_id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    user_id integer NOT NULL,
    username character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    user_image character varying(255)
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_user_id_seq OWNER TO postgres;

--
-- Name: users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;


--
-- Name: entries entry_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.entries ALTER COLUMN entry_id SET DEFAULT nextval('public.entries_entry_id_seq'::regclass);


--
-- Name: symptoms symptom_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.symptoms ALTER COLUMN symptom_id SET DEFAULT nextval('public.symptoms_symptom_id_seq'::regclass);


--
-- Name: users user_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);


--
-- Data for Name: entries; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.entries (entry_id, user_id, entry_date, content, symptoms, meal) FROM stdin;
2	1	2023-12-13	Exempeltext	Huvudvärk	Frukost
3	1	2023-12-14	Ny post	Nya symptom	Ny måltid
7	1	2023-12-20	hejsan	svejsan	hoppas nu 
8	1	2023-12-20	Jahapp, får testa igen	Ja va tusan….	Hoppas nu 
250	1	2024-01-09	Anteck. från test	Anteck. från test	Anteck. från test
251	1	2024-01-09	Anteck. från test	Anteck. från test	Anteck. från test
11	1	2023-12-20	suckkkk	jajaja	tjaaaaa
252	1	2024-01-09	Anteck. från test	Anteck. från test	Anteck. från test
128	1	2024-01-05	HEJ DÅ	ddddd	dddd
15	1	2023-12-23	Testinnehåll	Testsymptom	Testmåltid
16	1	2023-12-23	Anteckning-test	Anteckning-test	Anteckning-test
17	1	2023-12-23	Anteckning-test	Anteckning-test	Anteckning-test
253	1	2024-01-09	Anteck. från test	Anteck. från test	Anteck. från test
254	1	2024-01-09	Anteck. från test	Anteck. från test	Anteck. från test
255	1	2024-01-09	Anteck. från test	Anteck. från test	Anteck. från test
256	1	2024-01-09	Anteck. från test	Anteck. från test	Anteck. från test
257	1	2024-01-09	Anteck. från test	Anteck. från test	Anteck. från test
138	1	2024-01-07	Anteckning-test	Anteckning-test	Anteckning-test
139	1	2024-01-07	Anteckning-test	Anteckning-test	Anteckning-test
263	1	2024-01-12	Anteckning-test	Anteckning-test	Anteckning-test
248	1	2024-01-12	Updaterad anteckning	Updaterad anteckning	Updaterad anteckning
207	1	2024-01-10	Updaterad anteckning	ssssss	Updaterad anteckning
189	1	2024-01-09	Anteck. från test	Anteck. från test	Anteck. från test
190	1	2024-01-09	Anteck. från test	Anteck. från test	Anteck. från test
129	1	2024-01-06	Det fungerar eller ?	xxxx	xxxx
236	1	2024-01-11	Updaterad anteckning	Updaterad anteckning	Updaterad anteckning
187	1	2024-01-09	hghggh	Anteck. från test	Anteck. från test
165	1	2024-01-08	Anteckning-test	Anteckning-test	Anteckning-test
163	1	2024-01-08	Updaterad anteckning	Updaterad anteckning	Updaterad anteckning
243	1	2024-01-09	Anteck. från test	Anteck. från test	Anteck. från test
281	1	2024-01-14	Anteckning-test	Anteckning-test	Anteckning-test
\.


--
-- Data for Name: symptoms; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.symptoms (symptom_id, name, pain_intensity) FROM stdin;
3	Halsbränna	0
4	Bröstsmärta	0
5	Magsmärta	0
6	Uppblåsthet	0
7	Sura uppstötningar	0
8	Svårigheter att svälja	0
9	Heshet	0
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (user_id, username, password, email, user_image) FROM stdin;
1	example_user	password123	example@email.com	\N
\.


--
-- Name: entries_entry_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.entries_entry_id_seq', 295, true);


--
-- Name: symptoms_symptom_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.symptoms_symptom_id_seq', 9, true);


--
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_user_id_seq', 3, true);


--
-- Name: entries entries_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.entries
    ADD CONSTRAINT entries_pkey PRIMARY KEY (entry_id);


--
-- Name: symptoms symptoms_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.symptoms
    ADD CONSTRAINT symptoms_pkey PRIMARY KEY (symptom_id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- Name: entries entries_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.entries
    ADD CONSTRAINT entries_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id);


--
-- PostgreSQL database dump complete
--

