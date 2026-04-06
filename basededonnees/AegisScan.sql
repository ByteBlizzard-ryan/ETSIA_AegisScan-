--
-- PostgreSQL database cluster dump
--

-- Started on 2026-04-06 16:12:47

\restrict Naj6oflvH18dviyshoeWyhyviEKwBloFSHgK2EkJsMf2frrTpQ4AdDz5f797VuA

SET default_transaction_read_only = off;

SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;

--
-- Roles
--

CREATE ROLE postgres;
ALTER ROLE postgres WITH SUPERUSER INHERIT CREATEROLE CREATEDB LOGIN REPLICATION BYPASSRLS PASSWORD 'SCRAM-SHA-256$4096:K4yZ7+FY/kHBVL+iVSOHGA==$0kTloW7zR8LY4E6sRRwFwrZCVBHP0G2vBwGDl2EkP4I=:rApCYyhfP+3W4YbLqGgbmb5IFqJwj2dgOasek9mrt7I=';

--
-- User Configurations
--








\unrestrict Naj6oflvH18dviyshoeWyhyviEKwBloFSHgK2EkJsMf2frrTpQ4AdDz5f797VuA

--
-- Databases
--

--
-- Database "template1" dump
--

\connect template1

--
-- PostgreSQL database dump
--

\restrict WgmfgvGlMRtoka0PSQeTU40LIxjq8Gb1IkUqKYeO9hTjCP7n9DQfT2bzrYCIaew

-- Dumped from database version 18.1
-- Dumped by pg_dump version 18.1

-- Started on 2026-04-06 16:12:47

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

-- Completed on 2026-04-06 16:12:48

--
-- PostgreSQL database dump complete
--

\unrestrict WgmfgvGlMRtoka0PSQeTU40LIxjq8Gb1IkUqKYeO9hTjCP7n9DQfT2bzrYCIaew

--
-- Database "AegisScan" dump
--

--
-- PostgreSQL database dump
--

\restrict MkCS5taeDGzDtkyIJaNuk920QeSpsnBYTKljHOvRkBX0NSGAJ4fGA7fwVrqsO5Y

-- Dumped from database version 18.1
-- Dumped by pg_dump version 18.1

-- Started on 2026-04-06 16:12:48

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 5317 (class 1262 OID 16387)
-- Name: AegisScan; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE "AegisScan" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_Cameroon.1252';


ALTER DATABASE "AegisScan" OWNER TO postgres;

\unrestrict MkCS5taeDGzDtkyIJaNuk920QeSpsnBYTKljHOvRkBX0NSGAJ4fGA7fwVrqsO5Y
\connect "AegisScan"
\restrict MkCS5taeDGzDtkyIJaNuk920QeSpsnBYTKljHOvRkBX0NSGAJ4fGA7fwVrqsO5Y

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 2 (class 3079 OID 16401)
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- TOC entry 5318 (class 0 OID 0)
-- Dependencies: 2
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


--
-- TOC entry 894 (class 1247 OID 16469)
-- Name: abonnement_statut_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.abonnement_statut_enum AS ENUM (
    'actif',
    'expire',
    'suspendu'
);


ALTER TYPE public.abonnement_statut_enum OWNER TO postgres;

--
-- TOC entry 915 (class 1247 OID 16583)
-- Name: analyses_lien_niveau_risque_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.analyses_lien_niveau_risque_enum AS ENUM (
    'sûr',
    'suspect',
    'dangereux'
);


ALTER TYPE public.analyses_lien_niveau_risque_enum OWNER TO postgres;

--
-- TOC entry 918 (class 1247 OID 16590)
-- Name: analyses_lien_statut_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.analyses_lien_statut_enum AS ENUM (
    'autorisé',
    'bloqué'
);


ALTER TYPE public.analyses_lien_statut_enum OWNER TO postgres;

--
-- TOC entry 972 (class 1247 OID 17701)
-- Name: modules_educatifs_niveau_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.modules_educatifs_niveau_enum AS ENUM (
    'Débutant',
    'Intermédiaire',
    'Avancé'
);


ALTER TYPE public.modules_educatifs_niveau_enum OWNER TO postgres;

--
-- TOC entry 927 (class 1247 OID 16645)
-- Name: notification_niveau_urgence_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.notification_niveau_urgence_enum AS ENUM (
    'faible',
    'moyen',
    'eleve',
    'critique'
);


ALTER TYPE public.notification_niveau_urgence_enum OWNER TO postgres;

--
-- TOC entry 930 (class 1247 OID 16654)
-- Name: notification_type_signalement_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.notification_type_signalement_enum AS ENUM (
    'menace_detectee',
    'signalement',
    'statut_modifie',
    'rapport_hebdomadaire',
    'securite_urgence',
    'info',
    'promotion',
    'systeme'
);


ALTER TYPE public.notification_type_signalement_enum OWNER TO postgres;

--
-- TOC entry 966 (class 1247 OID 17658)
-- Name: signalements_niveau_urgence_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.signalements_niveau_urgence_enum AS ENUM (
    'faible',
    'moyen',
    'eleve',
    'critique'
);


ALTER TYPE public.signalements_niveau_urgence_enum OWNER TO postgres;

--
-- TOC entry 963 (class 1247 OID 17649)
-- Name: signalements_type_signalement_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.signalements_type_signalement_enum AS ENUM (
    'faux_negatif',
    'faux_positif',
    'vrai_positif',
    'vrai_negatif'
);


ALTER TYPE public.signalements_type_signalement_enum OWNER TO postgres;

--
-- TOC entry 909 (class 1247 OID 16559)
-- Name: type_menace_gravite_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.type_menace_gravite_enum AS ENUM (
    'faible',
    'moyenne',
    'élevée',
    'critique'
);


ALTER TYPE public.type_menace_gravite_enum OWNER TO postgres;

--
-- TOC entry 885 (class 1247 OID 16413)
-- Name: utilisateurs_type_compte_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.utilisateurs_type_compte_enum AS ENUM (
    'utilisateur',
    'administrateur'
);


ALTER TYPE public.utilisateurs_type_compte_enum OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 222 (class 1259 OID 16475)
-- Name: abonnement; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.abonnement (
    id_abonnement uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    date_debut timestamp without time zone DEFAULT now() NOT NULL,
    date_fin timestamp without time zone,
    statut public.abonnement_statut_enum DEFAULT 'actif'::public.abonnement_statut_enum NOT NULL,
    id_utilisateur uuid,
    id_plan_abonnement uuid
);


ALTER TABLE public.abonnement OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 16595)
-- Name: analyses_lien; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.analyses_lien (
    id_analyse uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    score_risque numeric(4,2) NOT NULL,
    niveau_risque public.analyses_lien_niveau_risque_enum NOT NULL,
    analyse_verdict_final character varying(20) NOT NULL,
    type_analyse character varying(20) NOT NULL,
    temps_analyse_ms integer NOT NULL,
    date_analyse timestamp without time zone DEFAULT now() NOT NULL,
    motifs text,
    canal_source character varying(50),
    statut public.analyses_lien_statut_enum NOT NULL,
    id_lien uuid,
    id_utilisateur uuid,
    id_menace uuid
);


ALTER TABLE public.analyses_lien OWNER TO postgres;

--
-- TOC entry 228 (class 1259 OID 16627)
-- Name: analyses_menaces; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.analyses_menaces (
    id_analyse uuid NOT NULL,
    id_menace uuid NOT NULL
);


ALTER TABLE public.analyses_menaces OWNER TO postgres;

--
-- TOC entry 238 (class 1259 OID 16991)
-- Name: analytics_events; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.analytics_events (
    id_event uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    event_type character varying(100) NOT NULL,
    event_data jsonb,
    page_url character varying(500),
    ip_address character varying(45),
    user_agent text,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    id_utilisateur uuid
);


ALTER TABLE public.analytics_events OWNER TO postgres;

--
-- TOC entry 235 (class 1259 OID 16919)
-- Name: assistance; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.assistance (
    id_assistance uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    sujet character varying(200) NOT NULL,
    message text NOT NULL,
    priorite character varying(20) DEFAULT 'Moyenne'::character varying NOT NULL,
    etat character varying(20) DEFAULT 'Ouvert'::character varying NOT NULL,
    date_creation timestamp without time zone DEFAULT now() NOT NULL,
    date_resolution timestamp without time zone,
    reponse text,
    agent_id uuid,
    id_utilisateur uuid
);


ALTER TABLE public.assistance OWNER TO postgres;

--
-- TOC entry 236 (class 1259 OID 16941)
-- Name: assistant_ia; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.assistant_ia (
    id_interaction uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    question text NOT NULL,
    reponse text NOT NULL,
    contexte character varying(50),
    date_interaction timestamp without time zone DEFAULT now() NOT NULL,
    satisfaction integer,
    id_utilisateur uuid,
    id_lien uuid,
    id_analyse uuid
);


ALTER TABLE public.assistant_ia OWNER TO postgres;

--
-- TOC entry 241 (class 1259 OID 17750)
-- Name: badges; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.badges (
    id_badge uuid DEFAULT gen_random_uuid() NOT NULL,
    nom_badge character varying(100) NOT NULL,
    description text,
    icone character varying(255),
    id_module uuid
);


ALTER TABLE public.badges OWNER TO postgres;

--
-- TOC entry 242 (class 1259 OID 17769)
-- Name: badges_utilisateur; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.badges_utilisateur (
    id_utilisateur uuid NOT NULL,
    id_badge uuid NOT NULL,
    date_obtention timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.badges_utilisateur OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 16496)
-- Name: canal; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.canal (
    id_canal uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    nom character varying(50) NOT NULL,
    description text,
    actif_par_defaut boolean DEFAULT true NOT NULL,
    icone character varying(255)
);


ALTER TABLE public.canal OWNER TO postgres;

--
-- TOC entry 224 (class 1259 OID 16510)
-- Name: canaux_utilisateur; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.canaux_utilisateur (
    id_canaux_utilisateur uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    actif boolean DEFAULT false NOT NULL,
    date_activation timestamp without time zone,
    id_utilisateur uuid,
    id_canal uuid
);


ALTER TABLE public.canaux_utilisateur OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 16529)
-- Name: lien; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.lien (
    id_lien uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    url text NOT NULL,
    url_complete text NOT NULL,
    url_hash character(64) NOT NULL,
    source character varying(50) NOT NULL,
    logiciel_source character varying(100),
    date_ajout timestamp without time zone DEFAULT now() NOT NULL,
    total_analyses integer DEFAULT 0 NOT NULL,
    id_canal uuid,
    id_utilisateur uuid
);


ALTER TABLE public.lien OWNER TO postgres;

--
-- TOC entry 230 (class 1259 OID 16758)
-- Name: modules_educatifs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.modules_educatifs (
    id_module uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    titre character varying(200) NOT NULL,
    description text NOT NULL,
    contenu text NOT NULL,
    duree_estimee integer,
    date_creation timestamp without time zone DEFAULT now() NOT NULL,
    acces_premium_only boolean DEFAULT false NOT NULL,
    url_image character varying(255),
    niveau public.modules_educatifs_niveau_enum DEFAULT 'Débutant'::public.modules_educatifs_niveau_enum NOT NULL
);


ALTER TABLE public.modules_educatifs OWNER TO postgres;

--
-- TOC entry 229 (class 1259 OID 16671)
-- Name: notification; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.notification (
    id_notification uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    type_alerte character varying(50) NOT NULL,
    niveau_alerte character varying(20) NOT NULL,
    message text NOT NULL,
    "date_création_alerte" timestamp without time zone DEFAULT now() NOT NULL,
    est_lue boolean DEFAULT false NOT NULL,
    date_lecture timestamp without time zone,
    niveau_urgence public.notification_niveau_urgence_enum DEFAULT 'faible'::public.notification_niveau_urgence_enum NOT NULL,
    type_signalement public.notification_type_signalement_enum NOT NULL,
    id_utilisateur uuid,
    id_analyse uuid
);


ALTER TABLE public.notification OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 16441)
-- Name: plan_abonnement; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.plan_abonnement (
    id_plan_abonnement uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    nom character varying(100) NOT NULL,
    prix_mensuel integer DEFAULT 0 NOT NULL,
    description text NOT NULL,
    limite_analyses_jour integer DEFAULT 10 NOT NULL,
    limite_historique_jours integer DEFAULT 30 NOT NULL,
    limite_quiz_jours integer DEFAULT 10 NOT NULL,
    acces_historique boolean DEFAULT false NOT NULL,
    acces_statistiques boolean DEFAULT false NOT NULL,
    acces_quiz_illimites boolean DEFAULT false NOT NULL
);


ALTER TABLE public.plan_abonnement OWNER TO postgres;

--
-- TOC entry 234 (class 1259 OID 16857)
-- Name: progression; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.progression (
    id_progression uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    score integer NOT NULL,
    score_max integer NOT NULL,
    pourcentage numeric(5,2) NOT NULL,
    date_completion timestamp without time zone DEFAULT now() NOT NULL,
    id_utilisateur uuid,
    id_module uuid,
    id_quiz uuid
);


ALTER TABLE public.progression OWNER TO postgres;

--
-- TOC entry 232 (class 1259 OID 16798)
-- Name: questions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.questions (
    id_question uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    texte text NOT NULL,
    points integer NOT NULL,
    ordre integer NOT NULL,
    explication_reponse text,
    id_quiz uuid,
    explication text
);


ALTER TABLE public.questions OWNER TO postgres;

--
-- TOC entry 231 (class 1259 OID 16777)
-- Name: quizzes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.quizzes (
    id_quiz uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    titre character varying(200) NOT NULL,
    description text,
    nb_questions integer NOT NULL,
    duree integer NOT NULL,
    points_max integer NOT NULL,
    acces_premium_only boolean DEFAULT false NOT NULL,
    id_module uuid
);


ALTER TABLE public.quizzes OWNER TO postgres;

--
-- TOC entry 233 (class 1259 OID 16817)
-- Name: reponses_possibles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.reponses_possibles (
    id_reponse uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    texte character varying(500) NOT NULL,
    est_correcte boolean DEFAULT false NOT NULL,
    ordre integer,
    id_question uuid
);


ALTER TABLE public.reponses_possibles OWNER TO postgres;

--
-- TOC entry 240 (class 1259 OID 17709)
-- Name: reponses_utilisateur; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.reponses_utilisateur (
    id_reponse_user uuid DEFAULT gen_random_uuid() NOT NULL,
    id_utilisateur uuid,
    id_question uuid,
    id_reponse_choisie uuid,
    est_correcte boolean NOT NULL,
    date_reponse timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.reponses_utilisateur OWNER TO postgres;

--
-- TOC entry 239 (class 1259 OID 17667)
-- Name: signalements; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.signalements (
    id_signalement uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    type_signalement public.signalements_type_signalement_enum NOT NULL,
    commentaire text,
    date_signalement timestamp without time zone DEFAULT now() NOT NULL,
    statut character varying(20) DEFAULT 'En attente'::character varying NOT NULL,
    date_traitement timestamp without time zone,
    motif_traitement text,
    niveau_urgence public.signalements_niveau_urgence_enum DEFAULT 'faible'::public.signalements_niveau_urgence_enum NOT NULL,
    id_utilisateur uuid,
    id_analyse uuid,
    traite_par uuid
);


ALTER TABLE public.signalements OWNER TO postgres;

--
-- TOC entry 226 (class 1259 OID 16567)
-- Name: type_menace; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.type_menace (
    id_menace uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    nom_menace character varying(100) NOT NULL,
    gravite public.type_menace_gravite_enum NOT NULL,
    date_creation timestamp without time zone DEFAULT now() NOT NULL,
    recommandation text
);


ALTER TABLE public.type_menace OWNER TO postgres;

--
-- TOC entry 237 (class 1259 OID 16969)
-- Name: user_sessions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_sessions (
    id_session uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    session_token_hash character varying(255) NOT NULL,
    ip_address character varying(45),
    user_agent text,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    expires_at timestamp without time zone NOT NULL,
    last_activity timestamp without time zone DEFAULT now() NOT NULL,
    is_active boolean DEFAULT true NOT NULL,
    id_utilisateur uuid
);


ALTER TABLE public.user_sessions OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 16417)
-- Name: utilisateurs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.utilisateurs (
    id_utilisateur uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    nom_utilisateur character varying(100) NOT NULL,
    email character varying(255) NOT NULL,
    mot_de_passe_hash character varying(255) NOT NULL,
    type_compte public.utilisateurs_type_compte_enum DEFAULT 'utilisateur'::public.utilisateurs_type_compte_enum NOT NULL,
    date_inscription timestamp without time zone DEFAULT now() NOT NULL,
    date_derniere_connexion timestamp without time zone,
    est_actif boolean DEFAULT true NOT NULL,
    consentement_analyse boolean DEFAULT false NOT NULL
);


ALTER TABLE public.utilisateurs OWNER TO postgres;

--
-- TOC entry 5291 (class 0 OID 16475)
-- Dependencies: 222
-- Data for Name: abonnement; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.abonnement (id_abonnement, date_debut, date_fin, statut, id_utilisateur, id_plan_abonnement) FROM stdin;
6209809f-b382-4c92-b532-bbb1ee27c9f5	2026-02-04 09:33:28.48876	\N	actif	a1111111-1111-1111-1111-111111111111	b1111111-1111-1111-1111-111111111111
ebc7e0bb-c2b4-4348-87e4-ed7b5f1d38c2	2026-02-04 09:33:28.48876	\N	actif	a2222222-2222-2222-2222-222222222222	b2222222-2222-2222-2222-222222222222
fc87cd1c-aade-489c-9918-6eefb22b7f3d	2026-02-04 09:33:28.48876	\N	expire	a4444444-4444-4444-4444-444444444444	b4444444-4444-4444-4444-444444444444
c390c64d-3f88-445e-a45c-1e2989805c48	2026-02-04 09:33:28.48876	\N	actif	a5555555-5555-5555-5555-555555555555	b2222222-2222-2222-2222-222222222222
3a05355f-5ba0-463b-9023-8383fd6688d2	2026-02-04 09:33:28.48876	\N	suspendu	a6666666-6666-6666-6666-666666666666	b5555555-5555-5555-5555-555555555555
2037804e-967b-47b9-ae15-4310bff37bc7	2026-02-04 09:33:28.48876	\N	expire	a7777777-7777-7777-7777-777777777777	b1111111-1111-1111-1111-111111111111
e9a7cb19-a395-4657-945a-5b888bc7b12e	2026-02-04 09:33:28.48876	\N	actif	a8888888-8888-8888-8888-888888888888	b3333333-3333-3333-3333-333333333333
466135a0-4419-4207-8115-756656a00af2	2026-02-04 09:33:28.48876	\N	actif	a9999999-9999-9999-9999-999999999999	b3333333-3333-3333-3333-333333333333
b1808100-056a-47b0-a076-193306ffafd4	2026-02-04 09:33:28.48876	\N	actif	a3333333-3333-3333-3333-333333333333	b0000000-0000-0000-0000-000000000000
8392d330-24bd-443f-afbe-7729676bfef6	2026-02-04 09:33:28.48876	\N	actif	a1111111-1111-1111-1111-111111111111	b2222222-2222-2222-2222-222222222222
\.


--
-- TOC entry 5296 (class 0 OID 16595)
-- Dependencies: 227
-- Data for Name: analyses_lien; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.analyses_lien (id_analyse, score_risque, niveau_risque, analyse_verdict_final, type_analyse, temps_analyse_ms, date_analyse, motifs, canal_source, statut, id_lien, id_utilisateur, id_menace) FROM stdin;
cdd486fe-e539-49b1-8b8f-1c43aa91598f	0.00	sûr	Lien sûr	VirusTotal API	1257	2026-02-05 10:54:08.611722	\N	Web Dashboard	autorisé	86524129-743d-4706-b0fb-64895ff38275	77e2bb1f-53d1-4b68-98d7-be7dc145d517	\N
e5d41859-21cd-47be-b570-592c40cd75e5	0.00	sûr	Lien sûr	VirusTotal API	1328	2026-02-05 14:32:42.351229	\N	Web Dashboard	autorisé	c4f53b7d-5052-442c-96c8-2206c2143be7	77e2bb1f-53d1-4b68-98d7-be7dc145d517	\N
37baad3b-7bd3-440e-8afa-ac1d0778d148	0.00	sûr	Lien sûr	VirusTotal API	858	2026-02-05 14:57:33.999217	\N	Web Dashboard	autorisé	35daacad-c63c-448a-92f2-56ec622fbca7	77e2bb1f-53d1-4b68-98d7-be7dc145d517	\N
b237682a-ffa7-418d-94a3-7602b8b7265a	10.00	dangereux	Lien dangereux	VirusTotal API	2439	2026-02-06 08:57:54.787918	\N	Web Dashboard	bloqué	e0caa470-0a46-4b44-a5cd-9209bea01405	77e2bb1f-53d1-4b68-98d7-be7dc145d517	\N
4a8f1dcd-1b39-4a35-80a3-9c6c7a29cb89	0.00	sûr	Lien sûr	VirusTotal API	29242	2026-02-06 16:13:58.626284	\N	Web Dashboard	autorisé	85963df3-afea-4212-818b-0ca427e3a692	77e2bb1f-53d1-4b68-98d7-be7dc145d517	\N
\.


--
-- TOC entry 5297 (class 0 OID 16627)
-- Dependencies: 228
-- Data for Name: analyses_menaces; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.analyses_menaces (id_analyse, id_menace) FROM stdin;
\.


--
-- TOC entry 5307 (class 0 OID 16991)
-- Dependencies: 238
-- Data for Name: analytics_events; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.analytics_events (id_event, event_type, event_data, page_url, ip_address, user_agent, created_at, id_utilisateur) FROM stdin;
\.


--
-- TOC entry 5304 (class 0 OID 16919)
-- Dependencies: 235
-- Data for Name: assistance; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.assistance (id_assistance, sujet, message, priorite, etat, date_creation, date_resolution, reponse, agent_id, id_utilisateur) FROM stdin;
\.


--
-- TOC entry 5305 (class 0 OID 16941)
-- Dependencies: 236
-- Data for Name: assistant_ia; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.assistant_ia (id_interaction, question, reponse, contexte, date_interaction, satisfaction, id_utilisateur, id_lien, id_analyse) FROM stdin;
\.


--
-- TOC entry 5310 (class 0 OID 17750)
-- Dependencies: 241
-- Data for Name: badges; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.badges (id_badge, nom_badge, description, icone, id_module) FROM stdin;
8f31a88a-6852-4270-8b7a-674d6b2abe68	Expert Phishing	Maîtrise totale du module Phishing	https://as2.ftcdn.net/v2/jpg/04/18/85/21/1000_F_418852123_TdEO7GKcT59xFv0TVr3kM6nlhnoTkZe3.jpg	9ef7fc03-3f51-49cc-b870-635724c052c8
\.


--
-- TOC entry 5311 (class 0 OID 17769)
-- Dependencies: 242
-- Data for Name: badges_utilisateur; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.badges_utilisateur (id_utilisateur, id_badge, date_obtention) FROM stdin;
77e2bb1f-53d1-4b68-98d7-be7dc145d517	8f31a88a-6852-4270-8b7a-674d6b2abe68	2026-04-06 15:05:40.488828
\.


--
-- TOC entry 5292 (class 0 OID 16496)
-- Dependencies: 223
-- Data for Name: canal; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.canal (id_canal, nom, description, actif_par_defaut, icone) FROM stdin;
\.


--
-- TOC entry 5293 (class 0 OID 16510)
-- Dependencies: 224
-- Data for Name: canaux_utilisateur; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.canaux_utilisateur (id_canaux_utilisateur, actif, date_activation, id_utilisateur, id_canal) FROM stdin;
\.


--
-- TOC entry 5294 (class 0 OID 16529)
-- Dependencies: 225
-- Data for Name: lien; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.lien (id_lien, url, url_complete, url_hash, source, logiciel_source, date_ajout, total_analyses, id_canal, id_utilisateur) FROM stdin;
86524129-743d-4706-b0fb-64895ff38275	https://www.google.com	https://www.google.com	ac6bb669e40e44a8d9f8f0c94dfc63734049dcf6219aac77f02edf94b9162c09	Dashboard Analysis	\N	2026-02-05 10:54:07.285243	1	\N	77e2bb1f-53d1-4b68-98d7-be7dc145d517
c4f53b7d-5052-442c-96c8-2206c2143be7	https://www.tiktok.com/@docteursolo237/video/7600800605468200213?_r=1&_t=ZS-93cTUJeFSOe	https://www.tiktok.com/@docteursolo237/video/7600800605468200213?_r=1&_t=ZS-93cTUJeFSOe	21cb724b98116e78b516c7ed52858191f4df97f43611f575687ad209bdabddac	Dashboard Analysis	\N	2026-02-05 14:32:41.095053	1	\N	77e2bb1f-53d1-4b68-98d7-be7dc145d517
35daacad-c63c-448a-92f2-56ec622fbca7	https://mail.google.com/mail/u/0/?hl=en#inbox	https://mail.google.com/mail/u/0/?hl=en#inbox	ce31d081e82a32cd4305a981a8e1f7c8f56a6d74a221004c2b45a53c9ba2229b	Dashboard Analysis	\N	2026-02-05 14:57:33.214099	1	\N	77e2bb1f-53d1-4b68-98d7-be7dc145d517
e0caa470-0a46-4b44-a5cd-9209bea01405	https://www.eicar.org/download/eicar.com.txt	https://www.eicar.org/download/eicar.com.txt	4f90b352e90b1572e7fb66619ea497520f2d94febbde0dcac0c6de0cf5aa7ffd	Dashboard Analysis	\N	2026-02-06 08:57:52.421206	1	\N	77e2bb1f-53d1-4b68-98d7-be7dc145d517
85963df3-afea-4212-818b-0ca427e3a692	https://www.youtube.com/watch?v=LHCob76kigA&list=RDMM&index=19	https://www.youtube.com/watch?v=LHCob76kigA&list=RDMM&index=19	f5119f748d7aa23be1d68e1ecac949f70398c31c60f28fd2da4ad7ef27b601e2	Dashboard Analysis	\N	2026-02-06 16:13:29.296171	1	\N	77e2bb1f-53d1-4b68-98d7-be7dc145d517
\.


--
-- TOC entry 5299 (class 0 OID 16758)
-- Dependencies: 230
-- Data for Name: modules_educatifs; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.modules_educatifs (id_module, titre, description, contenu, duree_estimee, date_creation, acces_premium_only, url_image, niveau) FROM stdin;
9ef7fc03-3f51-49cc-b870-635724c052c8	Phishing : Anatomie d'une Attaque par Ingénierie Sociale	Une plongée profonde dans les techniques de manipulation et les indicateurs techniques des mails d'hameçonnage.	### 1. Les Vecteurs Psychologiques\nLe phishing ne repose pas sur une faille informatique, mais sur une faille humaine. Les attaquants utilisent 3 leviers principaux :\n* **L'Urgence :** "Votre compte sera suspendu dans 2 heures". Cela court-circuite la pensée rationnelle.\n* **L'Autorité :** Usurpation d'identité de la direction (Fraude au Président) ou d'organismes d'État.\n* **La Curiosité ou la Peur :** "Consultez votre facture impayée de 1500€".\n\n### 2. Analyse Technique de l'Email\nPour identifier un mail frauduleux, l'examen doit être méthodique :\n* **Le Header "From" :** Ne vous fiez pas au nom affiché (ex: "Service Sécurité"). Regardez l'adresse réelle entre les chechets <...>. Un mail "support@paypal-security-check.com" n'est PAS un mail paypal.com.\n* **Les Hyperliens Masqués :** Ne cliquez jamais directement. Survolez le lien avec votre souris pour voir l'URL réelle en bas de votre navigateur. Les attaquants utilisent le Typosquatting (ex: g00gle.com au lieu de google.com).\n* **Le Punycode :** Attention aux caractères spéciaux qui ressemblent à des lettres normales (ex: un "a" cyrillique) pour tromper les filtres.\n\n### 3. Les Pièces Jointes Piégées\nUn fichier .pdf ou .docx peut contenir des macros malveillantes ou exploiter des vulnérabilités de votre lecteur. \n* **Le danger caché :** Un fichier nommé "Facture.pdf.exe" où l'extension réelle est masquée par Windows.\n\n### 4. Checklist de Protection\n1. Vérifiez la cohérence du message (pourquoi me demande-t-on cela maintenant ?).\n2. Contactez l'émetteur par un canal différent (téléphone, site officiel tapé manuellement).\n3. Activez l'authentification à deux facteurs (2FA) partout : même si votre mot de passe est volé, il sera inutile seul.	10	2026-03-11 15:06:16.480039	f	https://www.malwarebytes.com/wp-content/uploads/sites/2/2018/09/shutterstock_749866270.jpg	Débutant
\.


--
-- TOC entry 5298 (class 0 OID 16671)
-- Dependencies: 229
-- Data for Name: notification; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.notification (id_notification, type_alerte, niveau_alerte, message, "date_création_alerte", est_lue, date_lecture, niveau_urgence, type_signalement, id_utilisateur, id_analyse) FROM stdin;
\.


--
-- TOC entry 5290 (class 0 OID 16441)
-- Dependencies: 221
-- Data for Name: plan_abonnement; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.plan_abonnement (id_plan_abonnement, nom, prix_mensuel, description, limite_analyses_jour, limite_historique_jours, limite_quiz_jours, acces_historique, acces_statistiques, acces_quiz_illimites) FROM stdin;
b1111111-1111-1111-1111-111111111111	Gratuit	0	Offre de base	5	30	10	f	f	f
b2222222-2222-2222-2222-222222222222	Premium	10	Analyses illimitées	100	30	10	f	f	f
b3333333-3333-3333-3333-333333333333	Entreprise	50	Support 24/7	1000	30	10	f	f	f
b4444444-4444-4444-4444-444444444444	Etudiant	2	Prix réduit	10	30	10	f	f	f
b5555555-5555-5555-5555-555555555555	Expert	25	Outils avancés	500	30	10	f	f	f
b6666666-6666-6666-6666-666666666666	Famille	15	5 comptes inclus	50	30	10	f	f	f
b7777777-7777-7777-7777-777777777777	Développeur	12	Accès API	200	30	10	f	f	f
b8888888-8888-8888-8888-888888888888	Gouvernement	200	Haute sécurité	5000	30	10	f	f	f
b9999999-9999-9999-9999-999999999999	Saisonnier	5	Offre limitée	20	30	10	f	f	f
b0000000-0000-0000-0000-000000000000	VIP	0	Partenaire	10000	30	10	f	f	f
\.


--
-- TOC entry 5303 (class 0 OID 16857)
-- Dependencies: 234
-- Data for Name: progression; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.progression (id_progression, score, score_max, pourcentage, date_completion, id_utilisateur, id_module, id_quiz) FROM stdin;
\.


--
-- TOC entry 5301 (class 0 OID 16798)
-- Dependencies: 232
-- Data for Name: questions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.questions (id_question, texte, points, ordre, explication_reponse, id_quiz, explication) FROM stdin;
0e47ba95-a968-4117-aa55-2f479639e67a	Vous recevez un email de "Netflix" indiquant un problème de paiement. Quelle est la première chose à vérifier ?	20	1	L'adresse réelle de l'expéditeur (ex: @netflix.com) est plus fiable que le nom affiché qui peut être falsifié.	e4af4d73-2d31-4855-9c11-0788ca211127	\N
8cb688ed-e1ab-4823-ab70-1c9f777654e8	Comment vérifier la destination d'un lien sans cliquer dessus ?	20	2	Le survol affiche l'URL réelle en bas à gauche de votre navigateur ou client mail.	e4af4d73-2d31-4855-9c11-0788ca211127	\N
b683f3ef-328c-4c61-9307-63c93410dafb	Pourquoi les pirates utilisent-ils souvent un ton urgent ou menaçant ?	20	3	L'urgence provoque un stress qui nous empêche de réfléchir calmement et nous pousse à l'erreur.	e4af4d73-2d31-4855-9c11-0788ca211127	\N
8dfddf78-54d6-4309-a705-3b715d0cdc68	Une administration (Impôts, CAF) vous demande votre mot de passe par mail pour un remboursement. Que faire ?	20	4	Une administration légitime ne vous demandera JAMAIS votre mot de passe ou vos codes bancaires par email.	e4af4d73-2d31-4855-9c11-0788ca211127	\N
8fd2da27-6c7a-480c-aa49-cb81645d5157	Quelle est la meilleure protection si vous avez cliqué par erreur et donné vos identifiants ?	20	5	La 2FA bloque l'accès même si le pirate possède votre identifiant et votre mot de passe.	e4af4d73-2d31-4855-9c11-0788ca211127	\N
\.


--
-- TOC entry 5300 (class 0 OID 16777)
-- Dependencies: 231
-- Data for Name: quizzes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.quizzes (id_quiz, titre, description, nb_questions, duree, points_max, acces_premium_only, id_module) FROM stdin;
e4af4d73-2d31-4855-9c11-0788ca211127	Quiz : Maîtriser la détection du Phishing	Testez vos réflexes face aux emails frauduleux et aux liens suspects.	5	7	100	f	9ef7fc03-3f51-49cc-b870-635724c052c8
\.


--
-- TOC entry 5302 (class 0 OID 16817)
-- Dependencies: 233
-- Data for Name: reponses_possibles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.reponses_possibles (id_reponse, texte, est_correcte, ordre, id_question) FROM stdin;
d84d5c72-36d5-4d1b-8ace-76a63c881095	La présence du logo officiel Netflix	f	1	0e47ba95-a968-4117-aa55-2f479639e67a
ec22fe6a-7b2d-46dd-bd81-8a008029aff0	L'adresse email réelle derrière le nom de l'expéditeur	t	2	0e47ba95-a968-4117-aa55-2f479639e67a
7abf261d-dd8a-4536-9267-e57ae005d04e	La présence de fautes d'orthographe dans le texte	f	3	0e47ba95-a968-4117-aa55-2f479639e67a
539fc754-a392-443d-82a6-7aa03aa9303c	Le bouton "Mettre à jour" s'il est bien rouge	f	4	0e47ba95-a968-4117-aa55-2f479639e67a
763e5e28-05ae-440a-bdb0-eca6f7268c40	En faisant un clic droit sur le lien	f	1	8cb688ed-e1ab-4823-ab70-1c9f777654e8
691e9ae4-e015-45d5-8976-d882f377cc92	En survolant le lien avec le curseur de la souris	t	2	8cb688ed-e1ab-4823-ab70-1c9f777654e8
f65dab31-53cd-432a-8f1c-9a26ad5cdb4c	En copiant le lien dans Word	f	3	8cb688ed-e1ab-4823-ab70-1c9f777654e8
0f3fe3c6-5a65-4cda-b087-4aae7042019e	Il est impossible de vérifier sans cliquer	f	4	8cb688ed-e1ab-4823-ab70-1c9f777654e8
32fd3300-4401-4d58-9bb6-dc25621a1e49	Pour montrer qu'ils sont très professionnels	f	1	b683f3ef-328c-4c61-9307-63c93410dafb
dfda5326-2f3f-48f3-888e-97966e1a214c	Pour vous faire gagner du temps	f	2	b683f3ef-328c-4c61-9307-63c93410dafb
505d2d35-755b-4324-8730-230ce66f1ab3	Pour court-circuiter votre sens critique par la panique	t	3	b683f3ef-328c-4c61-9307-63c93410dafb
d9e04440-0657-4747-b6ec-3b0eac0d4a1f	Parce qu'ils sont eux-mêmes pressés	f	4	b683f3ef-328c-4c61-9307-63c93410dafb
5293c4e8-ef2e-41fd-9655-4bb060967adb	Répondre immédiatement pour avoir l'argent	f	1	8dfddf78-54d6-4309-a705-3b715d0cdc68
0d31abed-7e72-4ded-b5f2-562effecdae1	Donner seulement la moitié du mot de passe	f	2	8dfddf78-54d6-4309-a705-3b715d0cdc68
eccab04a-db6e-45a6-bea8-584563179ace	Ignorer le mail car c'est une tentative de vol	t	3	8dfddf78-54d6-4309-a705-3b715d0cdc68
239705bb-e060-4b25-b54d-ecc741d33a4b	Appeler le numéro indiqué dans le mail	f	4	8dfddf78-54d6-4309-a705-3b715d0cdc68
0d7bdfb0-c1de-47c0-b5a0-36ef9873007e	Avoir un fond d'écran sécurisé	f	1	8fd2da27-6c7a-480c-aa49-cb81645d5157
c0db02c1-a6a6-4018-a334-05142bf4e434	L'authentification à deux facteurs (2FA/MFA)	t	2	8fd2da27-6c7a-480c-aa49-cb81645d5157
b571a6c0-e21d-4955-bde1-0c6b5c921746	Éteindre l'ordinateur pendant 24h	f	3	8fd2da27-6c7a-480c-aa49-cb81645d5157
31953a82-8629-4ca2-884c-ef537c78f077	Supprimer l'email de phishing	f	4	8fd2da27-6c7a-480c-aa49-cb81645d5157
\.


--
-- TOC entry 5309 (class 0 OID 17709)
-- Dependencies: 240
-- Data for Name: reponses_utilisateur; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.reponses_utilisateur (id_reponse_user, id_utilisateur, id_question, id_reponse_choisie, est_correcte, date_reponse) FROM stdin;
b844adc6-500c-441c-9c86-610701bb15a7	77e2bb1f-53d1-4b68-98d7-be7dc145d517	0e47ba95-a968-4117-aa55-2f479639e67a	ec22fe6a-7b2d-46dd-bd81-8a008029aff0	t	2026-04-06 15:05:40.36298
05efc3ac-e93e-45b0-a38c-77f99c7955fb	77e2bb1f-53d1-4b68-98d7-be7dc145d517	8cb688ed-e1ab-4823-ab70-1c9f777654e8	691e9ae4-e015-45d5-8976-d882f377cc92	t	2026-04-06 15:05:40.455162
017ceae9-e361-4547-bd98-ab058fc80afe	77e2bb1f-53d1-4b68-98d7-be7dc145d517	b683f3ef-328c-4c61-9307-63c93410dafb	505d2d35-755b-4324-8730-230ce66f1ab3	t	2026-04-06 15:05:40.461176
7a0363af-3896-4d75-802b-6b0f6948bb8b	77e2bb1f-53d1-4b68-98d7-be7dc145d517	8dfddf78-54d6-4309-a705-3b715d0cdc68	eccab04a-db6e-45a6-bea8-584563179ace	t	2026-04-06 15:05:40.466766
2a5c03b0-8d58-4c00-9361-39d847867dc3	77e2bb1f-53d1-4b68-98d7-be7dc145d517	8fd2da27-6c7a-480c-aa49-cb81645d5157	c0db02c1-a6a6-4018-a334-05142bf4e434	t	2026-04-06 15:05:40.47142
ed47e04f-ade3-4470-be7a-58088975f0dc	77e2bb1f-53d1-4b68-98d7-be7dc145d517	0e47ba95-a968-4117-aa55-2f479639e67a	ec22fe6a-7b2d-46dd-bd81-8a008029aff0	t	2026-04-06 15:09:08.848731
b8c07314-db60-43dd-a736-ab9dd66809d0	77e2bb1f-53d1-4b68-98d7-be7dc145d517	8cb688ed-e1ab-4823-ab70-1c9f777654e8	691e9ae4-e015-45d5-8976-d882f377cc92	t	2026-04-06 15:09:08.938194
55f04a20-1b6e-4b99-8d92-34a296fe99dc	77e2bb1f-53d1-4b68-98d7-be7dc145d517	b683f3ef-328c-4c61-9307-63c93410dafb	505d2d35-755b-4324-8730-230ce66f1ab3	t	2026-04-06 15:09:08.942695
1f64dd1c-45c9-41db-b210-d4b193e0a129	77e2bb1f-53d1-4b68-98d7-be7dc145d517	8dfddf78-54d6-4309-a705-3b715d0cdc68	eccab04a-db6e-45a6-bea8-584563179ace	t	2026-04-06 15:09:08.947501
c7a43509-1033-45a2-bc09-13cfd1f50d54	77e2bb1f-53d1-4b68-98d7-be7dc145d517	8fd2da27-6c7a-480c-aa49-cb81645d5157	c0db02c1-a6a6-4018-a334-05142bf4e434	t	2026-04-06 15:09:08.952018
\.


--
-- TOC entry 5308 (class 0 OID 17667)
-- Dependencies: 239
-- Data for Name: signalements; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.signalements (id_signalement, type_signalement, commentaire, date_signalement, statut, date_traitement, motif_traitement, niveau_urgence, id_utilisateur, id_analyse, traite_par) FROM stdin;
\.


--
-- TOC entry 5295 (class 0 OID 16567)
-- Dependencies: 226
-- Data for Name: type_menace; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.type_menace (id_menace, nom_menace, gravite, date_creation, recommandation) FROM stdin;
\.


--
-- TOC entry 5306 (class 0 OID 16969)
-- Dependencies: 237
-- Data for Name: user_sessions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_sessions (id_session, session_token_hash, ip_address, user_agent, created_at, expires_at, last_activity, is_active, id_utilisateur) FROM stdin;
\.


--
-- TOC entry 5289 (class 0 OID 16417)
-- Dependencies: 220
-- Data for Name: utilisateurs; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.utilisateurs (id_utilisateur, nom_utilisateur, email, mot_de_passe_hash, type_compte, date_inscription, date_derniere_connexion, est_actif, consentement_analyse) FROM stdin;
312674c2-92f9-4809-be5c-f04abaaccf68	GabyBryan	gaby@example.com	qwertyuiop1234	utilisateur	2026-01-28 15:17:59.571249	\N	t	t
8e39f688-44dd-4240-94f6-5d9897e52f56	Gaby2	Bryga@gmail.com	$2b$10$efksNTLnwx9jqw8GQ0fhpeOYthu47S6ZsX6wkJUgmt3wk5ytX1o3K	utilisateur	2026-01-28 21:20:16.612782	\N	t	t
433098e0-c365-4097-9873-2b9f030ff332	Gaby3	gaby3@gmail.com	$2b$10$Ph8nqlAGPmgmLzM02GcQ1u6lmOVy566sWIQHJ6dVZzrqNDZXLpEqO	utilisateur	2026-01-28 21:28:00.940268	\N	t	t
40cd91e3-b29f-40db-b3ed-59ced99fdf4e	Gaby4	gaby4@gmail.com	$2b$10$3JIcMOiDd5kiizp1XRh5h.fe78bjP2erO/Tl7QcyNwIHVHZIseblm	utilisateur	2026-01-28 21:52:16.932767	\N	t	t
b1e85914-9443-42c9-aba6-8c157fc7f6c3	Gaby5	gaby5@gmail.com	$2b$10$U9u7sjGXHLLVP/TD0GdQS.4XyGylxwMeT3qKkvO1jiycszRl9XCRS	utilisateur	2026-02-02 12:36:04.108833	\N	t	t
a1111111-1111-1111-1111-111111111111	Jean Dupont	jean@example.com	hash_123	utilisateur	2026-02-04 09:30:34.618257	\N	t	t
a2222222-2222-2222-2222-222222222222	Marie Curie	marie@science.fr	hash_456	utilisateur	2026-02-04 09:30:34.618257	\N	t	t
a3333333-3333-3333-3333-333333333333	Admin Root	admin@cyber.com	hash_admin	administrateur	2026-02-04 09:30:34.618257	\N	t	t
a4444444-4444-4444-4444-444444444444	Luc Lucas	luc@test.com	hash_789	utilisateur	2026-02-04 09:30:34.618257	\N	t	f
a5555555-5555-5555-5555-555555555555	Sarah Connor	sarah@skynet.com	hash_000	utilisateur	2026-02-04 09:30:34.618257	\N	t	t
a6666666-6666-6666-6666-666666666666	Thomas Anderson	neo@matrix.com	hash_neo	utilisateur	2026-02-04 09:30:34.618257	\N	t	t
a7777777-7777-7777-7777-777777777777	Ellen Ripley	ripley@nostromo.com	hash_alien	utilisateur	2026-02-04 09:30:34.618257	\N	f	t
a8888888-8888-8888-8888-888888888888	Tony Stark	tony@stark.com	hash_iron	utilisateur	2026-02-04 09:30:34.618257	\N	t	t
a9999999-9999-9999-9999-999999999999	Bruce Wayne	bruce@wayne.com	hash_bat	utilisateur	2026-02-04 09:30:34.618257	\N	t	t
a0000000-0000-0000-0000-000000000000	Agent Smith	smith@matrix.com	hash_smith	administrateur	2026-02-04 09:30:34.618257	\N	t	t
77e2bb1f-53d1-4b68-98d7-be7dc145d517	Gaby	gaby@gmail.com	$2b$10$QmsZoGEHRSy7oyP7GXYvAeVnjTt9QHUTyhzSvRzDEaf1N17YlDhCy	utilisateur	2026-02-05 08:33:24.666652	\N	t	t
\.


--
-- TOC entry 5059 (class 2606 OID 16507)
-- Name: canal PK_02ab4855006cff6471c9c030076; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.canal
    ADD CONSTRAINT "PK_02ab4855006cff6471c9c030076" PRIMARY KEY (id_canal);


--
-- TOC entry 5087 (class 2606 OID 16868)
-- Name: progression PK_133b32b71fca89de8445282bfb0; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.progression
    ADD CONSTRAINT "PK_133b32b71fca89de8445282bfb0" PRIMARY KEY (id_progression);


--
-- TOC entry 5079 (class 2606 OID 16776)
-- Name: modules_educatifs PK_2b59df422bf9d0f77c78606884f; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.modules_educatifs
    ADD CONSTRAINT "PK_2b59df422bf9d0f77c78606884f" PRIMARY KEY (id_module);


--
-- TOC entry 5085 (class 2606 OID 16828)
-- Name: reponses_possibles PK_315227fc04fe140854fd89ff46c; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reponses_possibles
    ADD CONSTRAINT "PK_315227fc04fe140854fd89ff46c" PRIMARY KEY (id_reponse);


--
-- TOC entry 5083 (class 2606 OID 16811)
-- Name: questions PK_42f7d8f0cb5a36bdb8873474f73; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.questions
    ADD CONSTRAINT "PK_42f7d8f0cb5a36bdb8873474f73" PRIMARY KEY (id_question);


--
-- TOC entry 5077 (class 2606 OID 16689)
-- Name: notification PK_5eeade67aa70b7db4a6bdd4dcd8; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notification
    ADD CONSTRAINT "PK_5eeade67aa70b7db4a6bdd4dcd8" PRIMARY KEY (id_notification);


--
-- TOC entry 5057 (class 2606 OID 16485)
-- Name: abonnement PK_6692f82021b7c092b6c1f690341; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.abonnement
    ADD CONSTRAINT "PK_6692f82021b7c092b6c1f690341" PRIMARY KEY (id_abonnement);


--
-- TOC entry 5073 (class 2606 OID 16611)
-- Name: analyses_lien PK_70578035d0568a670ad1bc722c0; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.analyses_lien
    ADD CONSTRAINT "PK_70578035d0568a670ad1bc722c0" PRIMARY KEY (id_analyse);


--
-- TOC entry 5065 (class 2606 OID 16545)
-- Name: lien PK_816475941785ad8d9b895408537; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lien
    ADD CONSTRAINT "PK_816475941785ad8d9b895408537" PRIMARY KEY (id_lien);


--
-- TOC entry 5053 (class 2606 OID 16465)
-- Name: plan_abonnement PK_91049cd7294c8bfa427dcc78de7; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.plan_abonnement
    ADD CONSTRAINT "PK_91049cd7294c8bfa427dcc78de7" PRIMARY KEY (id_plan_abonnement);


--
-- TOC entry 5075 (class 2606 OID 16633)
-- Name: analyses_menaces PK_a2ecb873990a79498d5e796ac49; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.analyses_menaces
    ADD CONSTRAINT "PK_a2ecb873990a79498d5e796ac49" PRIMARY KEY (id_analyse, id_menace);


--
-- TOC entry 5081 (class 2606 OID 16791)
-- Name: quizzes PK_ae90148207a30a64322c649b816; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.quizzes
    ADD CONSTRAINT "PK_ae90148207a30a64322c649b816" PRIMARY KEY (id_quiz);


--
-- TOC entry 5063 (class 2606 OID 16518)
-- Name: canaux_utilisateur PK_b8833c88ee71dd863ac201c017a; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.canaux_utilisateur
    ADD CONSTRAINT "PK_b8833c88ee71dd863ac201c017a" PRIMARY KEY (id_canaux_utilisateur);


--
-- TOC entry 5091 (class 2606 OID 16953)
-- Name: assistant_ia PK_be999d262a6561470262e8b6f3a; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.assistant_ia
    ADD CONSTRAINT "PK_be999d262a6561470262e8b6f3a" PRIMARY KEY (id_interaction);


--
-- TOC entry 5089 (class 2606 OID 16935)
-- Name: assistance PK_c7924e83f42e49777b53170d8f1; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.assistance
    ADD CONSTRAINT "PK_c7924e83f42e49777b53170d8f1" PRIMARY KEY (id_assistance);


--
-- TOC entry 5097 (class 2606 OID 17682)
-- Name: signalements PK_d33677c376e2cb5d8725aa61206; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.signalements
    ADD CONSTRAINT "PK_d33677c376e2cb5d8725aa61206" PRIMARY KEY (id_signalement);


--
-- TOC entry 5095 (class 2606 OID 17002)
-- Name: analytics_events PK_dc285f0a66940e3ffee46c9dcc8; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.analytics_events
    ADD CONSTRAINT "PK_dc285f0a66940e3ffee46c9dcc8" PRIMARY KEY (id_event);


--
-- TOC entry 5069 (class 2606 OID 16579)
-- Name: type_menace PK_e72f51d27ff8c1fb1eacb935ce9; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.type_menace
    ADD CONSTRAINT "PK_e72f51d27ff8c1fb1eacb935ce9" PRIMARY KEY (id_menace);


--
-- TOC entry 5093 (class 2606 OID 16985)
-- Name: user_sessions PK_f7f3780fd0c0e292f0edb89a8a7; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_sessions
    ADD CONSTRAINT "PK_f7f3780fd0c0e292f0edb89a8a7" PRIMARY KEY (id_session);


--
-- TOC entry 5047 (class 2606 OID 16436)
-- Name: utilisateurs PK_f97d7d520e86e39824860ec9f75; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.utilisateurs
    ADD CONSTRAINT "PK_f97d7d520e86e39824860ec9f75" PRIMARY KEY (id_utilisateur);


--
-- TOC entry 5055 (class 2606 OID 16467)
-- Name: plan_abonnement UQ_2cac44f5cf6cd528ba6e1c049c7; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.plan_abonnement
    ADD CONSTRAINT "UQ_2cac44f5cf6cd528ba6e1c049c7" UNIQUE (nom);


--
-- TOC entry 5067 (class 2606 OID 16547)
-- Name: lien UQ_3c9db67cb4dac1955cdfdf96ee6; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lien
    ADD CONSTRAINT "UQ_3c9db67cb4dac1955cdfdf96ee6" UNIQUE (url_hash);


--
-- TOC entry 5049 (class 2606 OID 16440)
-- Name: utilisateurs UQ_6b14325a486fe68d16aa889e4dc; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.utilisateurs
    ADD CONSTRAINT "UQ_6b14325a486fe68d16aa889e4dc" UNIQUE (email);


--
-- TOC entry 5051 (class 2606 OID 16438)
-- Name: utilisateurs UQ_829ae9c2452b0b6bd59cfeb70fd; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.utilisateurs
    ADD CONSTRAINT "UQ_829ae9c2452b0b6bd59cfeb70fd" UNIQUE (nom_utilisateur);


--
-- TOC entry 5061 (class 2606 OID 16509)
-- Name: canal UQ_95a4d5db5f794bf15f4fed64d07; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.canal
    ADD CONSTRAINT "UQ_95a4d5db5f794bf15f4fed64d07" UNIQUE (nom);


--
-- TOC entry 5071 (class 2606 OID 16581)
-- Name: type_menace UQ_a2e14992ae7332b3aba54741a3b; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.type_menace
    ADD CONSTRAINT "UQ_a2e14992ae7332b3aba54741a3b" UNIQUE (nom_menace);


--
-- TOC entry 5101 (class 2606 OID 17763)
-- Name: badges badges_id_module_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.badges
    ADD CONSTRAINT badges_id_module_key UNIQUE (id_module);


--
-- TOC entry 5103 (class 2606 OID 17761)
-- Name: badges badges_nom_badge_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.badges
    ADD CONSTRAINT badges_nom_badge_key UNIQUE (nom_badge);


--
-- TOC entry 5105 (class 2606 OID 17759)
-- Name: badges badges_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.badges
    ADD CONSTRAINT badges_pkey PRIMARY KEY (id_badge);


--
-- TOC entry 5107 (class 2606 OID 17776)
-- Name: badges_utilisateur badges_utilisateur_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.badges_utilisateur
    ADD CONSTRAINT badges_utilisateur_pkey PRIMARY KEY (id_utilisateur, id_badge);


--
-- TOC entry 5099 (class 2606 OID 17717)
-- Name: reponses_utilisateur reponses_utilisateur_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reponses_utilisateur
    ADD CONSTRAINT reponses_utilisateur_pkey PRIMARY KEY (id_reponse_user);


--
-- TOC entry 5124 (class 2606 OID 16869)
-- Name: progression FK_0316a66f5527b7d3791fa86cfc7; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.progression
    ADD CONSTRAINT "FK_0316a66f5527b7d3791fa86cfc7" FOREIGN KEY (id_utilisateur) REFERENCES public.utilisateurs(id_utilisateur) ON DELETE CASCADE;


--
-- TOC entry 5122 (class 2606 OID 16812)
-- Name: questions FK_08d309879692aedad5450701e7a; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.questions
    ADD CONSTRAINT "FK_08d309879692aedad5450701e7a" FOREIGN KEY (id_quiz) REFERENCES public.quizzes(id_quiz) ON DELETE CASCADE;


--
-- TOC entry 5112 (class 2606 OID 16548)
-- Name: lien FK_0af605e01882a1dd6c4f36942d5; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lien
    ADD CONSTRAINT "FK_0af605e01882a1dd6c4f36942d5" FOREIGN KEY (id_canal) REFERENCES public.canal(id_canal);


--
-- TOC entry 5110 (class 2606 OID 16524)
-- Name: canaux_utilisateur FK_140e3e5fbc5f06e33b618fcbef9; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.canaux_utilisateur
    ADD CONSTRAINT "FK_140e3e5fbc5f06e33b618fcbef9" FOREIGN KEY (id_canal) REFERENCES public.canal(id_canal);


--
-- TOC entry 5119 (class 2606 OID 16690)
-- Name: notification FK_15e0b16ba387aefc7066f121391; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notification
    ADD CONSTRAINT "FK_15e0b16ba387aefc7066f121391" FOREIGN KEY (id_utilisateur) REFERENCES public.utilisateurs(id_utilisateur);


--
-- TOC entry 5140 (class 2606 OID 17795)
-- Name: badges_utilisateur FK_17fe6f8c6712e0676dccec587ec; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.badges_utilisateur
    ADD CONSTRAINT "FK_17fe6f8c6712e0676dccec587ec" FOREIGN KEY (id_utilisateur) REFERENCES public.utilisateurs(id_utilisateur) ON DELETE CASCADE;


--
-- TOC entry 5133 (class 2606 OID 17693)
-- Name: signalements FK_18c85a7dc66a20a24b233d78427; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.signalements
    ADD CONSTRAINT "FK_18c85a7dc66a20a24b233d78427" FOREIGN KEY (traite_par) REFERENCES public.utilisateurs(id_utilisateur);


--
-- TOC entry 5128 (class 2606 OID 16954)
-- Name: assistant_ia FK_1c7f44fa4fb549fac3d92c62537; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.assistant_ia
    ADD CONSTRAINT "FK_1c7f44fa4fb549fac3d92c62537" FOREIGN KEY (id_utilisateur) REFERENCES public.utilisateurs(id_utilisateur);


--
-- TOC entry 5121 (class 2606 OID 16792)
-- Name: quizzes FK_1ce2960d162e0fd7075cc0c85ba; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.quizzes
    ADD CONSTRAINT "FK_1ce2960d162e0fd7075cc0c85ba" FOREIGN KEY (id_module) REFERENCES public.modules_educatifs(id_module) ON DELETE CASCADE;


--
-- TOC entry 5125 (class 2606 OID 16879)
-- Name: progression FK_26f00a8dd827030ba1a1448a754; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.progression
    ADD CONSTRAINT "FK_26f00a8dd827030ba1a1448a754" FOREIGN KEY (id_quiz) REFERENCES public.quizzes(id_quiz) ON DELETE CASCADE;


--
-- TOC entry 5136 (class 2606 OID 17735)
-- Name: reponses_utilisateur FK_2e68ec52e549763dee9da1bbd25; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reponses_utilisateur
    ADD CONSTRAINT "FK_2e68ec52e549763dee9da1bbd25" FOREIGN KEY (id_utilisateur) REFERENCES public.utilisateurs(id_utilisateur) ON DELETE CASCADE;


--
-- TOC entry 5137 (class 2606 OID 17740)
-- Name: reponses_utilisateur FK_2f48cac576e225323f2497ad3c0; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reponses_utilisateur
    ADD CONSTRAINT "FK_2f48cac576e225323f2497ad3c0" FOREIGN KEY (id_question) REFERENCES public.questions(id_question) ON DELETE CASCADE;


--
-- TOC entry 5134 (class 2606 OID 17688)
-- Name: signalements FK_35cb6eef7ae3b923413ab071874; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.signalements
    ADD CONSTRAINT "FK_35cb6eef7ae3b923413ab071874" FOREIGN KEY (id_analyse) REFERENCES public.analyses_lien(id_analyse);


--
-- TOC entry 5139 (class 2606 OID 17790)
-- Name: badges FK_412db14959dd4909e7fb3f66f31; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.badges
    ADD CONSTRAINT "FK_412db14959dd4909e7fb3f66f31" FOREIGN KEY (id_module) REFERENCES public.modules_educatifs(id_module) ON DELETE SET NULL;


--
-- TOC entry 5138 (class 2606 OID 17745)
-- Name: reponses_utilisateur FK_4a1b848db0a380c12b7fa349f2d; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reponses_utilisateur
    ADD CONSTRAINT "FK_4a1b848db0a380c12b7fa349f2d" FOREIGN KEY (id_reponse_choisie) REFERENCES public.reponses_possibles(id_reponse) ON DELETE SET NULL;


--
-- TOC entry 5131 (class 2606 OID 16986)
-- Name: user_sessions FK_55912198b81ce1628ee105a6b97; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_sessions
    ADD CONSTRAINT "FK_55912198b81ce1628ee105a6b97" FOREIGN KEY (id_utilisateur) REFERENCES public.utilisateurs(id_utilisateur);


--
-- TOC entry 5117 (class 2606 OID 16634)
-- Name: analyses_menaces FK_5e3d80dfe7d6d0b1d9888bd8335; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.analyses_menaces
    ADD CONSTRAINT "FK_5e3d80dfe7d6d0b1d9888bd8335" FOREIGN KEY (id_analyse) REFERENCES public.analyses_lien(id_analyse) ON DELETE CASCADE;


--
-- TOC entry 5111 (class 2606 OID 16519)
-- Name: canaux_utilisateur FK_6d1ea3df8f5c5bf36013660b9f3; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.canaux_utilisateur
    ADD CONSTRAINT "FK_6d1ea3df8f5c5bf36013660b9f3" FOREIGN KEY (id_utilisateur) REFERENCES public.utilisateurs(id_utilisateur);


--
-- TOC entry 5129 (class 2606 OID 16959)
-- Name: assistant_ia FK_6f2359403182a9d0a1118946cd2; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.assistant_ia
    ADD CONSTRAINT "FK_6f2359403182a9d0a1118946cd2" FOREIGN KEY (id_lien) REFERENCES public.lien(id_lien);


--
-- TOC entry 5130 (class 2606 OID 16964)
-- Name: assistant_ia FK_81e97caf4421ed1e921b92ec65f; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.assistant_ia
    ADD CONSTRAINT "FK_81e97caf4421ed1e921b92ec65f" FOREIGN KEY (id_analyse) REFERENCES public.analyses_lien(id_analyse);


--
-- TOC entry 5108 (class 2606 OID 16491)
-- Name: abonnement FK_8606469a6608c66593c1c2094f8; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.abonnement
    ADD CONSTRAINT "FK_8606469a6608c66593c1c2094f8" FOREIGN KEY (id_plan_abonnement) REFERENCES public.plan_abonnement(id_plan_abonnement);


--
-- TOC entry 5120 (class 2606 OID 16695)
-- Name: notification FK_8840dc7cb75080250f2cf3163c2; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notification
    ADD CONSTRAINT "FK_8840dc7cb75080250f2cf3163c2" FOREIGN KEY (id_analyse) REFERENCES public.analyses_lien(id_analyse);


--
-- TOC entry 5114 (class 2606 OID 16612)
-- Name: analyses_lien FK_999f55868f2c0105c57e8bff51d; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.analyses_lien
    ADD CONSTRAINT "FK_999f55868f2c0105c57e8bff51d" FOREIGN KEY (id_lien) REFERENCES public.lien(id_lien);


--
-- TOC entry 5141 (class 2606 OID 17800)
-- Name: badges_utilisateur FK_afe187abb4f79906117ac53c759; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.badges_utilisateur
    ADD CONSTRAINT "FK_afe187abb4f79906117ac53c759" FOREIGN KEY (id_badge) REFERENCES public.badges(id_badge) ON DELETE CASCADE;


--
-- TOC entry 5132 (class 2606 OID 17003)
-- Name: analytics_events FK_bdd4fd1712ce3f59c62d8ab309d; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.analytics_events
    ADD CONSTRAINT "FK_bdd4fd1712ce3f59c62d8ab309d" FOREIGN KEY (id_utilisateur) REFERENCES public.utilisateurs(id_utilisateur);


--
-- TOC entry 5135 (class 2606 OID 17683)
-- Name: signalements FK_c31bcb54ead484f6b6574760959; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.signalements
    ADD CONSTRAINT "FK_c31bcb54ead484f6b6574760959" FOREIGN KEY (id_utilisateur) REFERENCES public.utilisateurs(id_utilisateur);


--
-- TOC entry 5127 (class 2606 OID 16936)
-- Name: assistance FK_cae85303cea45457d4009ebfdb4; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.assistance
    ADD CONSTRAINT "FK_cae85303cea45457d4009ebfdb4" FOREIGN KEY (id_utilisateur) REFERENCES public.utilisateurs(id_utilisateur);


--
-- TOC entry 5113 (class 2606 OID 16553)
-- Name: lien FK_e3d3d99d59f01ec360d05c39e66; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lien
    ADD CONSTRAINT "FK_e3d3d99d59f01ec360d05c39e66" FOREIGN KEY (id_utilisateur) REFERENCES public.utilisateurs(id_utilisateur);


--
-- TOC entry 5115 (class 2606 OID 16617)
-- Name: analyses_lien FK_e4fa9aa7525421ca78b415387b5; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.analyses_lien
    ADD CONSTRAINT "FK_e4fa9aa7525421ca78b415387b5" FOREIGN KEY (id_utilisateur) REFERENCES public.utilisateurs(id_utilisateur);


--
-- TOC entry 5118 (class 2606 OID 16639)
-- Name: analyses_menaces FK_e7f3c9ef554fd3c95243324fb6b; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.analyses_menaces
    ADD CONSTRAINT "FK_e7f3c9ef554fd3c95243324fb6b" FOREIGN KEY (id_menace) REFERENCES public.type_menace(id_menace) ON DELETE CASCADE;


--
-- TOC entry 5116 (class 2606 OID 16622)
-- Name: analyses_lien FK_ebd7757b3d54b29cf26c2081ee5; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.analyses_lien
    ADD CONSTRAINT "FK_ebd7757b3d54b29cf26c2081ee5" FOREIGN KEY (id_menace) REFERENCES public.type_menace(id_menace);


--
-- TOC entry 5109 (class 2606 OID 16486)
-- Name: abonnement FK_f1462812af403f9bb9e868591eb; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.abonnement
    ADD CONSTRAINT "FK_f1462812af403f9bb9e868591eb" FOREIGN KEY (id_utilisateur) REFERENCES public.utilisateurs(id_utilisateur);


--
-- TOC entry 5123 (class 2606 OID 16829)
-- Name: reponses_possibles FK_f8ac5d1c28913736722e5aae0f1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reponses_possibles
    ADD CONSTRAINT "FK_f8ac5d1c28913736722e5aae0f1" FOREIGN KEY (id_question) REFERENCES public.questions(id_question) ON DELETE CASCADE;


--
-- TOC entry 5126 (class 2606 OID 16874)
-- Name: progression FK_fe47a7ce83be68141c0b150a8c5; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.progression
    ADD CONSTRAINT "FK_fe47a7ce83be68141c0b150a8c5" FOREIGN KEY (id_module) REFERENCES public.modules_educatifs(id_module) ON DELETE CASCADE;


-- Completed on 2026-04-06 16:12:48

--
-- PostgreSQL database dump complete
--

\unrestrict MkCS5taeDGzDtkyIJaNuk920QeSpsnBYTKljHOvRkBX0NSGAJ4fGA7fwVrqsO5Y

--
-- Database "postgres" dump
--

\connect postgres

--
-- PostgreSQL database dump
--

\restrict Phn4eqlxNUkeYRE26AcBg68Q9B4z5Nntsxtd7MLVxMd1mNRfuXr8JMi2f8wtLQz

-- Dumped from database version 18.1
-- Dumped by pg_dump version 18.1

-- Started on 2026-04-06 16:12:48

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

-- Completed on 2026-04-06 16:12:49

--
-- PostgreSQL database dump complete
--

\unrestrict Phn4eqlxNUkeYRE26AcBg68Q9B4z5Nntsxtd7MLVxMd1mNRfuXr8JMi2f8wtLQz

--
-- Database "postgres2" dump
--

--
-- PostgreSQL database dump
--

\restrict qbOHsEyjefSAnRhEpEHuofb6az0Sa3yedfS1SbKcy2jUl27lkEHhUJMAkJsct4U

-- Dumped from database version 18.1
-- Dumped by pg_dump version 18.1

-- Started on 2026-04-06 16:12:49

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 5311 (class 1262 OID 17008)
-- Name: postgres2; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE postgres2 WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_Cameroon.1252';


ALTER DATABASE postgres2 OWNER TO postgres;

\unrestrict qbOHsEyjefSAnRhEpEHuofb6az0Sa3yedfS1SbKcy2jUl27lkEHhUJMAkJsct4U
\connect postgres2
\restrict qbOHsEyjefSAnRhEpEHuofb6az0Sa3yedfS1SbKcy2jUl27lkEHhUJMAkJsct4U

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 2 (class 3079 OID 17009)
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- TOC entry 5312 (class 0 OID 0)
-- Dependencies: 2
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


--
-- TOC entry 894 (class 1247 OID 17077)
-- Name: abonnement_statut_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.abonnement_statut_enum AS ENUM (
    'actif',
    'expire',
    'suspendu'
);


ALTER TYPE public.abonnement_statut_enum OWNER TO postgres;

--
-- TOC entry 915 (class 1247 OID 17161)
-- Name: analyses_lien_niveau_risque_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.analyses_lien_niveau_risque_enum AS ENUM (
    'sûr',
    'suspect',
    'dangereux'
);


ALTER TYPE public.analyses_lien_niveau_risque_enum OWNER TO postgres;

--
-- TOC entry 918 (class 1247 OID 17168)
-- Name: analyses_lien_statut_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.analyses_lien_statut_enum AS ENUM (
    'autorisé',
    'bloqué'
);


ALTER TYPE public.analyses_lien_statut_enum OWNER TO postgres;

--
-- TOC entry 927 (class 1247 OID 17198)
-- Name: notification_niveau_urgence_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.notification_niveau_urgence_enum AS ENUM (
    'faible',
    'moyen',
    'eleve',
    'critique'
);


ALTER TYPE public.notification_niveau_urgence_enum OWNER TO postgres;

--
-- TOC entry 930 (class 1247 OID 17208)
-- Name: notification_type_signalement_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.notification_type_signalement_enum AS ENUM (
    'menace_detectee',
    'signalement',
    'statut_modifie',
    'rapport_hebdomadaire',
    'securite_urgence',
    'info',
    'promotion',
    'systeme'
);


ALTER TYPE public.notification_type_signalement_enum OWNER TO postgres;

--
-- TOC entry 939 (class 1247 OID 17262)
-- Name: signalements_niveau_urgence_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.signalements_niveau_urgence_enum AS ENUM (
    'faible',
    'moyen',
    'eleve',
    'critique'
);


ALTER TYPE public.signalements_niveau_urgence_enum OWNER TO postgres;

--
-- TOC entry 936 (class 1247 OID 17245)
-- Name: signalements_type_signalement_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.signalements_type_signalement_enum AS ENUM (
    'menace_detectee',
    'signalement',
    'statut_modifie',
    'rapport_hebdomadaire',
    'securite_urgence',
    'info',
    'promotion',
    'systeme'
);


ALTER TYPE public.signalements_type_signalement_enum OWNER TO postgres;

--
-- TOC entry 909 (class 1247 OID 17137)
-- Name: type_menace_gravite_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.type_menace_gravite_enum AS ENUM (
    'faible',
    'moyenne',
    'élevée',
    'critique'
);


ALTER TYPE public.type_menace_gravite_enum OWNER TO postgres;

--
-- TOC entry 885 (class 1247 OID 17021)
-- Name: utilisateurs_type_compte_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.utilisateurs_type_compte_enum AS ENUM (
    'utilisateur',
    'administrateur'
);


ALTER TYPE public.utilisateurs_type_compte_enum OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 222 (class 1259 OID 17083)
-- Name: abonnement; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.abonnement (
    id_abonnement uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    date_debut timestamp without time zone DEFAULT now() NOT NULL,
    date_fin timestamp without time zone,
    statut public.abonnement_statut_enum DEFAULT 'actif'::public.abonnement_statut_enum NOT NULL,
    id_utilisateur uuid,
    id_plan_abonnement uuid
);


ALTER TABLE public.abonnement OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 17173)
-- Name: analyses_lien; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.analyses_lien (
    id_analyse uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    score_risque numeric(4,2) NOT NULL,
    niveau_risque public.analyses_lien_niveau_risque_enum NOT NULL,
    analyse_verdict_final character varying(20) NOT NULL,
    type_analyse character varying(20) NOT NULL,
    temps_analyse_ms integer NOT NULL,
    date_analyse timestamp without time zone DEFAULT now() NOT NULL,
    motifs text,
    canal_source character varying(50),
    statut public.analyses_lien_statut_enum NOT NULL,
    id_lien uuid,
    id_utilisateur uuid,
    id_menace uuid
);


ALTER TABLE public.analyses_lien OWNER TO postgres;

--
-- TOC entry 228 (class 1259 OID 17190)
-- Name: analyses_menaces; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.analyses_menaces (
    id_analyse uuid NOT NULL,
    id_menace uuid NOT NULL
);


ALTER TABLE public.analyses_menaces OWNER TO postgres;

--
-- TOC entry 242 (class 1259 OID 17443)
-- Name: analytics_events; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.analytics_events (
    id_event uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    event_type character varying(100) NOT NULL,
    event_data jsonb,
    page_url character varying(500),
    ip_address character varying(45),
    user_agent text,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    id_utilisateur uuid
);


ALTER TABLE public.analytics_events OWNER TO postgres;

--
-- TOC entry 239 (class 1259 OID 17396)
-- Name: assistance; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.assistance (
    id_assistance uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    sujet character varying(200) NOT NULL,
    message text NOT NULL,
    priorite character varying(20) DEFAULT 'Moyenne'::character varying NOT NULL,
    etat character varying(20) DEFAULT 'Ouvert'::character varying NOT NULL,
    date_creation timestamp without time zone DEFAULT now() NOT NULL,
    date_resolution timestamp without time zone,
    reponse text,
    agent_id uuid,
    id_utilisateur uuid
);


ALTER TABLE public.assistance OWNER TO postgres;

--
-- TOC entry 240 (class 1259 OID 17413)
-- Name: assistant_ia; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.assistant_ia (
    id_interaction uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    question text NOT NULL,
    reponse text NOT NULL,
    contexte character varying(50),
    date_interaction timestamp without time zone DEFAULT now() NOT NULL,
    satisfaction integer,
    id_utilisateur uuid,
    id_lien uuid,
    id_analyse uuid
);


ALTER TABLE public.assistant_ia OWNER TO postgres;

--
-- TOC entry 237 (class 1259 OID 17372)
-- Name: badges; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.badges (
    id_badge uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    nom_badge character varying(100) NOT NULL,
    description text,
    icone character varying(255),
    condition text NOT NULL,
    points_requis integer DEFAULT 0 NOT NULL,
    type_badge character varying(50)
);


ALTER TABLE public.badges OWNER TO postgres;

--
-- TOC entry 238 (class 1259 OID 17387)
-- Name: badges_utilisateur; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.badges_utilisateur (
    id_utilisateur uuid NOT NULL,
    id_badge uuid NOT NULL,
    date_obtention timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.badges_utilisateur OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 17094)
-- Name: canal; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.canal (
    id_canal uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    nom character varying(50) NOT NULL,
    description text,
    actif_par_defaut boolean DEFAULT true NOT NULL,
    icone character varying(255)
);


ALTER TABLE public.canal OWNER TO postgres;

--
-- TOC entry 224 (class 1259 OID 17108)
-- Name: canaux_utilisateur; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.canaux_utilisateur (
    id_canaux_utilisateur uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    actif boolean DEFAULT false NOT NULL,
    date_activation timestamp without time zone,
    id_utilisateur uuid,
    id_canal uuid
);


ALTER TABLE public.canaux_utilisateur OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 17117)
-- Name: lien; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.lien (
    id_lien uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    url text NOT NULL,
    url_complete text NOT NULL,
    url_hash character(64) NOT NULL,
    source character varying(50) NOT NULL,
    logiciel_source character varying(100),
    date_ajout timestamp without time zone DEFAULT now() NOT NULL,
    total_analyses integer DEFAULT 0 NOT NULL,
    id_canal uuid,
    id_utilisateur uuid
);


ALTER TABLE public.lien OWNER TO postgres;

--
-- TOC entry 231 (class 1259 OID 17287)
-- Name: modules_educatifs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.modules_educatifs (
    id_module uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    titre character varying(200) NOT NULL,
    description text NOT NULL,
    contenu text NOT NULL,
    niveau character varying(20) NOT NULL,
    duree_estimee integer,
    date_creation timestamp without time zone DEFAULT now() NOT NULL,
    acces_premium_only boolean DEFAULT false NOT NULL,
    ordre_affichage integer DEFAULT 0 NOT NULL
);


ALTER TABLE public.modules_educatifs OWNER TO postgres;

--
-- TOC entry 229 (class 1259 OID 17225)
-- Name: notification; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.notification (
    id_notification uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    type_alerte character varying(50) NOT NULL,
    niveau_alerte character varying(20) NOT NULL,
    message text NOT NULL,
    "date_création_alerte" timestamp without time zone DEFAULT now() NOT NULL,
    est_lue boolean DEFAULT false NOT NULL,
    date_lecture timestamp without time zone,
    niveau_urgence public.notification_niveau_urgence_enum DEFAULT 'faible'::public.notification_niveau_urgence_enum NOT NULL,
    type_signalement public.notification_type_signalement_enum NOT NULL,
    id_utilisateur uuid,
    id_analyse uuid
);


ALTER TABLE public.notification OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 17049)
-- Name: plan_abonnement; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.plan_abonnement (
    id_plan_abonnement uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    nom character varying(100) NOT NULL,
    prix_mensuel integer DEFAULT 0 NOT NULL,
    description text NOT NULL,
    limite_analyses_jour integer DEFAULT 10 NOT NULL,
    limite_historique_jours integer DEFAULT 30 NOT NULL,
    limite_quiz_jours integer DEFAULT 10 NOT NULL,
    acces_historique boolean DEFAULT false NOT NULL,
    acces_statistiques boolean DEFAULT false NOT NULL,
    acces_quiz_illimites boolean DEFAULT false NOT NULL
);


ALTER TABLE public.plan_abonnement OWNER TO postgres;

--
-- TOC entry 236 (class 1259 OID 17360)
-- Name: progression; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.progression (
    id_progression uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    score integer NOT NULL,
    score_max integer NOT NULL,
    pourcentage numeric(5,2) NOT NULL,
    date_completion timestamp without time zone DEFAULT now() NOT NULL,
    id_utilisateur uuid,
    id_module uuid,
    id_quiz uuid
);


ALTER TABLE public.progression OWNER TO postgres;

--
-- TOC entry 233 (class 1259 OID 17321)
-- Name: questions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.questions (
    id_question uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    texte text NOT NULL,
    type_question character varying(20) NOT NULL,
    bonne_reponse character varying(500) NOT NULL,
    points integer NOT NULL,
    ordre integer NOT NULL,
    explication text,
    id_quiz uuid
);


ALTER TABLE public.questions OWNER TO postgres;

--
-- TOC entry 232 (class 1259 OID 17306)
-- Name: quizzes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.quizzes (
    id_quiz uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    titre character varying(200) NOT NULL,
    description text,
    nb_questions integer NOT NULL,
    duree integer NOT NULL,
    points_max integer NOT NULL,
    acces_premium_only boolean DEFAULT false NOT NULL,
    id_module uuid
);


ALTER TABLE public.quizzes OWNER TO postgres;

--
-- TOC entry 234 (class 1259 OID 17335)
-- Name: reponses_possibles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.reponses_possibles (
    id_reponse uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    texte character varying(500) NOT NULL,
    est_correcte boolean DEFAULT false NOT NULL,
    ordre integer,
    id_question uuid
);


ALTER TABLE public.reponses_possibles OWNER TO postgres;

--
-- TOC entry 235 (class 1259 OID 17347)
-- Name: reponses_utilisateur; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.reponses_utilisateur (
    id_reponse_user uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    reponse_choisie character varying(500) NOT NULL,
    est_correcte boolean NOT NULL,
    date_reponse timestamp without time zone DEFAULT now() NOT NULL,
    id_utilisateur uuid,
    id_question uuid
);


ALTER TABLE public.reponses_utilisateur OWNER TO postgres;

--
-- TOC entry 230 (class 1259 OID 17271)
-- Name: signalements; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.signalements (
    id_signalement uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    type_signalement public.signalements_type_signalement_enum NOT NULL,
    commentaire text,
    date_signalement timestamp without time zone DEFAULT now() NOT NULL,
    statut character varying(20) DEFAULT 'En attente'::character varying NOT NULL,
    date_traitement timestamp without time zone,
    motif_traitement text,
    niveau_urgence public.signalements_niveau_urgence_enum DEFAULT 'faible'::public.signalements_niveau_urgence_enum NOT NULL,
    id_utilisateur uuid,
    id_analyse uuid,
    traite_par uuid
);


ALTER TABLE public.signalements OWNER TO postgres;

--
-- TOC entry 226 (class 1259 OID 17145)
-- Name: type_menace; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.type_menace (
    id_menace uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    nom_menace character varying(100) NOT NULL,
    gravite public.type_menace_gravite_enum NOT NULL,
    date_creation timestamp without time zone DEFAULT now() NOT NULL,
    recommandation text
);


ALTER TABLE public.type_menace OWNER TO postgres;

--
-- TOC entry 241 (class 1259 OID 17426)
-- Name: user_sessions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_sessions (
    id_session uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    session_token_hash character varying(255) NOT NULL,
    ip_address character varying(45),
    user_agent text,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    expires_at timestamp without time zone NOT NULL,
    last_activity timestamp without time zone DEFAULT now() NOT NULL,
    is_active boolean DEFAULT true NOT NULL,
    id_utilisateur uuid
);


ALTER TABLE public.user_sessions OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 17025)
-- Name: utilisateurs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.utilisateurs (
    id_utilisateur uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    nom_utilisateur character varying(100) NOT NULL,
    email character varying(255) NOT NULL,
    mot_de_passe_hash character varying(255) NOT NULL,
    type_compte public.utilisateurs_type_compte_enum DEFAULT 'utilisateur'::public.utilisateurs_type_compte_enum NOT NULL,
    date_inscription timestamp without time zone DEFAULT now() NOT NULL,
    date_derniere_connexion timestamp without time zone,
    est_actif boolean DEFAULT true NOT NULL,
    consentement_analyse boolean DEFAULT false NOT NULL
);


ALTER TABLE public.utilisateurs OWNER TO postgres;

--
-- TOC entry 5285 (class 0 OID 17083)
-- Dependencies: 222
-- Data for Name: abonnement; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.abonnement (id_abonnement, date_debut, date_fin, statut, id_utilisateur, id_plan_abonnement) FROM stdin;
\.


--
-- TOC entry 5290 (class 0 OID 17173)
-- Dependencies: 227
-- Data for Name: analyses_lien; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.analyses_lien (id_analyse, score_risque, niveau_risque, analyse_verdict_final, type_analyse, temps_analyse_ms, date_analyse, motifs, canal_source, statut, id_lien, id_utilisateur, id_menace) FROM stdin;
\.


--
-- TOC entry 5291 (class 0 OID 17190)
-- Dependencies: 228
-- Data for Name: analyses_menaces; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.analyses_menaces (id_analyse, id_menace) FROM stdin;
\.


--
-- TOC entry 5305 (class 0 OID 17443)
-- Dependencies: 242
-- Data for Name: analytics_events; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.analytics_events (id_event, event_type, event_data, page_url, ip_address, user_agent, created_at, id_utilisateur) FROM stdin;
\.


--
-- TOC entry 5302 (class 0 OID 17396)
-- Dependencies: 239
-- Data for Name: assistance; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.assistance (id_assistance, sujet, message, priorite, etat, date_creation, date_resolution, reponse, agent_id, id_utilisateur) FROM stdin;
\.


--
-- TOC entry 5303 (class 0 OID 17413)
-- Dependencies: 240
-- Data for Name: assistant_ia; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.assistant_ia (id_interaction, question, reponse, contexte, date_interaction, satisfaction, id_utilisateur, id_lien, id_analyse) FROM stdin;
\.


--
-- TOC entry 5300 (class 0 OID 17372)
-- Dependencies: 237
-- Data for Name: badges; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.badges (id_badge, nom_badge, description, icone, condition, points_requis, type_badge) FROM stdin;
\.


--
-- TOC entry 5301 (class 0 OID 17387)
-- Dependencies: 238
-- Data for Name: badges_utilisateur; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.badges_utilisateur (id_utilisateur, id_badge, date_obtention) FROM stdin;
\.


--
-- TOC entry 5286 (class 0 OID 17094)
-- Dependencies: 223
-- Data for Name: canal; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.canal (id_canal, nom, description, actif_par_defaut, icone) FROM stdin;
\.


--
-- TOC entry 5287 (class 0 OID 17108)
-- Dependencies: 224
-- Data for Name: canaux_utilisateur; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.canaux_utilisateur (id_canaux_utilisateur, actif, date_activation, id_utilisateur, id_canal) FROM stdin;
\.


--
-- TOC entry 5288 (class 0 OID 17117)
-- Dependencies: 225
-- Data for Name: lien; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.lien (id_lien, url, url_complete, url_hash, source, logiciel_source, date_ajout, total_analyses, id_canal, id_utilisateur) FROM stdin;
\.


--
-- TOC entry 5294 (class 0 OID 17287)
-- Dependencies: 231
-- Data for Name: modules_educatifs; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.modules_educatifs (id_module, titre, description, contenu, niveau, duree_estimee, date_creation, acces_premium_only, ordre_affichage) FROM stdin;
\.


--
-- TOC entry 5292 (class 0 OID 17225)
-- Dependencies: 229
-- Data for Name: notification; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.notification (id_notification, type_alerte, niveau_alerte, message, "date_création_alerte", est_lue, date_lecture, niveau_urgence, type_signalement, id_utilisateur, id_analyse) FROM stdin;
\.


--
-- TOC entry 5284 (class 0 OID 17049)
-- Dependencies: 221
-- Data for Name: plan_abonnement; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.plan_abonnement (id_plan_abonnement, nom, prix_mensuel, description, limite_analyses_jour, limite_historique_jours, limite_quiz_jours, acces_historique, acces_statistiques, acces_quiz_illimites) FROM stdin;
\.


--
-- TOC entry 5299 (class 0 OID 17360)
-- Dependencies: 236
-- Data for Name: progression; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.progression (id_progression, score, score_max, pourcentage, date_completion, id_utilisateur, id_module, id_quiz) FROM stdin;
\.


--
-- TOC entry 5296 (class 0 OID 17321)
-- Dependencies: 233
-- Data for Name: questions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.questions (id_question, texte, type_question, bonne_reponse, points, ordre, explication, id_quiz) FROM stdin;
\.


--
-- TOC entry 5295 (class 0 OID 17306)
-- Dependencies: 232
-- Data for Name: quizzes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.quizzes (id_quiz, titre, description, nb_questions, duree, points_max, acces_premium_only, id_module) FROM stdin;
\.


--
-- TOC entry 5297 (class 0 OID 17335)
-- Dependencies: 234
-- Data for Name: reponses_possibles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.reponses_possibles (id_reponse, texte, est_correcte, ordre, id_question) FROM stdin;
\.


--
-- TOC entry 5298 (class 0 OID 17347)
-- Dependencies: 235
-- Data for Name: reponses_utilisateur; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.reponses_utilisateur (id_reponse_user, reponse_choisie, est_correcte, date_reponse, id_utilisateur, id_question) FROM stdin;
\.


--
-- TOC entry 5293 (class 0 OID 17271)
-- Dependencies: 230
-- Data for Name: signalements; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.signalements (id_signalement, type_signalement, commentaire, date_signalement, statut, date_traitement, motif_traitement, niveau_urgence, id_utilisateur, id_analyse, traite_par) FROM stdin;
\.


--
-- TOC entry 5289 (class 0 OID 17145)
-- Dependencies: 226
-- Data for Name: type_menace; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.type_menace (id_menace, nom_menace, gravite, date_creation, recommandation) FROM stdin;
\.


--
-- TOC entry 5304 (class 0 OID 17426)
-- Dependencies: 241
-- Data for Name: user_sessions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_sessions (id_session, session_token_hash, ip_address, user_agent, created_at, expires_at, last_activity, is_active, id_utilisateur) FROM stdin;
\.


--
-- TOC entry 5283 (class 0 OID 17025)
-- Dependencies: 220
-- Data for Name: utilisateurs; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.utilisateurs (id_utilisateur, nom_utilisateur, email, mot_de_passe_hash, type_compte, date_inscription, date_derniere_connexion, est_actif, consentement_analyse) FROM stdin;
\.


--
-- TOC entry 5057 (class 2606 OID 17105)
-- Name: canal PK_02ab4855006cff6471c9c030076; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.canal
    ADD CONSTRAINT "PK_02ab4855006cff6471c9c030076" PRIMARY KEY (id_canal);


--
-- TOC entry 5089 (class 2606 OID 17371)
-- Name: progression PK_133b32b71fca89de8445282bfb0; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.progression
    ADD CONSTRAINT "PK_133b32b71fca89de8445282bfb0" PRIMARY KEY (id_progression);


--
-- TOC entry 5095 (class 2606 OID 17395)
-- Name: badges_utilisateur PK_24eb64e57233ca0ead9754879a7; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.badges_utilisateur
    ADD CONSTRAINT "PK_24eb64e57233ca0ead9754879a7" PRIMARY KEY (id_utilisateur, id_badge);


--
-- TOC entry 5079 (class 2606 OID 17305)
-- Name: modules_educatifs PK_2b59df422bf9d0f77c78606884f; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.modules_educatifs
    ADD CONSTRAINT "PK_2b59df422bf9d0f77c78606884f" PRIMARY KEY (id_module);


--
-- TOC entry 5085 (class 2606 OID 17346)
-- Name: reponses_possibles PK_315227fc04fe140854fd89ff46c; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reponses_possibles
    ADD CONSTRAINT "PK_315227fc04fe140854fd89ff46c" PRIMARY KEY (id_reponse);


--
-- TOC entry 5083 (class 2606 OID 17334)
-- Name: questions PK_42f7d8f0cb5a36bdb8873474f73; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.questions
    ADD CONSTRAINT "PK_42f7d8f0cb5a36bdb8873474f73" PRIMARY KEY (id_question);


--
-- TOC entry 5075 (class 2606 OID 17243)
-- Name: notification PK_5eeade67aa70b7db4a6bdd4dcd8; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notification
    ADD CONSTRAINT "PK_5eeade67aa70b7db4a6bdd4dcd8" PRIMARY KEY (id_notification);


--
-- TOC entry 5055 (class 2606 OID 17093)
-- Name: abonnement PK_6692f82021b7c092b6c1f690341; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.abonnement
    ADD CONSTRAINT "PK_6692f82021b7c092b6c1f690341" PRIMARY KEY (id_abonnement);


--
-- TOC entry 5071 (class 2606 OID 17189)
-- Name: analyses_lien PK_70578035d0568a670ad1bc722c0; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.analyses_lien
    ADD CONSTRAINT "PK_70578035d0568a670ad1bc722c0" PRIMARY KEY (id_analyse);


--
-- TOC entry 5087 (class 2606 OID 17359)
-- Name: reponses_utilisateur PK_7d985db0c8a50050be15f4341ba; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reponses_utilisateur
    ADD CONSTRAINT "PK_7d985db0c8a50050be15f4341ba" PRIMARY KEY (id_reponse_user);


--
-- TOC entry 5063 (class 2606 OID 17133)
-- Name: lien PK_816475941785ad8d9b895408537; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lien
    ADD CONSTRAINT "PK_816475941785ad8d9b895408537" PRIMARY KEY (id_lien);


--
-- TOC entry 5051 (class 2606 OID 17073)
-- Name: plan_abonnement PK_91049cd7294c8bfa427dcc78de7; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.plan_abonnement
    ADD CONSTRAINT "PK_91049cd7294c8bfa427dcc78de7" PRIMARY KEY (id_plan_abonnement);


--
-- TOC entry 5073 (class 2606 OID 17196)
-- Name: analyses_menaces PK_a2ecb873990a79498d5e796ac49; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.analyses_menaces
    ADD CONSTRAINT "PK_a2ecb873990a79498d5e796ac49" PRIMARY KEY (id_analyse, id_menace);


--
-- TOC entry 5081 (class 2606 OID 17320)
-- Name: quizzes PK_ae90148207a30a64322c649b816; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.quizzes
    ADD CONSTRAINT "PK_ae90148207a30a64322c649b816" PRIMARY KEY (id_quiz);


--
-- TOC entry 5061 (class 2606 OID 17116)
-- Name: canaux_utilisateur PK_b8833c88ee71dd863ac201c017a; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.canaux_utilisateur
    ADD CONSTRAINT "PK_b8833c88ee71dd863ac201c017a" PRIMARY KEY (id_canaux_utilisateur);


--
-- TOC entry 5099 (class 2606 OID 17425)
-- Name: assistant_ia PK_be999d262a6561470262e8b6f3a; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.assistant_ia
    ADD CONSTRAINT "PK_be999d262a6561470262e8b6f3a" PRIMARY KEY (id_interaction);


--
-- TOC entry 5097 (class 2606 OID 17412)
-- Name: assistance PK_c7924e83f42e49777b53170d8f1; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.assistance
    ADD CONSTRAINT "PK_c7924e83f42e49777b53170d8f1" PRIMARY KEY (id_assistance);


--
-- TOC entry 5091 (class 2606 OID 17384)
-- Name: badges PK_c98f1f0f776c271fe6ff9849353; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.badges
    ADD CONSTRAINT "PK_c98f1f0f776c271fe6ff9849353" PRIMARY KEY (id_badge);


--
-- TOC entry 5077 (class 2606 OID 17286)
-- Name: signalements PK_d33677c376e2cb5d8725aa61206; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.signalements
    ADD CONSTRAINT "PK_d33677c376e2cb5d8725aa61206" PRIMARY KEY (id_signalement);


--
-- TOC entry 5103 (class 2606 OID 17454)
-- Name: analytics_events PK_dc285f0a66940e3ffee46c9dcc8; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.analytics_events
    ADD CONSTRAINT "PK_dc285f0a66940e3ffee46c9dcc8" PRIMARY KEY (id_event);


--
-- TOC entry 5067 (class 2606 OID 17157)
-- Name: type_menace PK_e72f51d27ff8c1fb1eacb935ce9; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.type_menace
    ADD CONSTRAINT "PK_e72f51d27ff8c1fb1eacb935ce9" PRIMARY KEY (id_menace);


--
-- TOC entry 5101 (class 2606 OID 17442)
-- Name: user_sessions PK_f7f3780fd0c0e292f0edb89a8a7; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_sessions
    ADD CONSTRAINT "PK_f7f3780fd0c0e292f0edb89a8a7" PRIMARY KEY (id_session);


--
-- TOC entry 5045 (class 2606 OID 17044)
-- Name: utilisateurs PK_f97d7d520e86e39824860ec9f75; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.utilisateurs
    ADD CONSTRAINT "PK_f97d7d520e86e39824860ec9f75" PRIMARY KEY (id_utilisateur);


--
-- TOC entry 5053 (class 2606 OID 17075)
-- Name: plan_abonnement UQ_2cac44f5cf6cd528ba6e1c049c7; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.plan_abonnement
    ADD CONSTRAINT "UQ_2cac44f5cf6cd528ba6e1c049c7" UNIQUE (nom);


--
-- TOC entry 5065 (class 2606 OID 17135)
-- Name: lien UQ_3c9db67cb4dac1955cdfdf96ee6; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lien
    ADD CONSTRAINT "UQ_3c9db67cb4dac1955cdfdf96ee6" UNIQUE (url_hash);


--
-- TOC entry 5047 (class 2606 OID 17048)
-- Name: utilisateurs UQ_6b14325a486fe68d16aa889e4dc; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.utilisateurs
    ADD CONSTRAINT "UQ_6b14325a486fe68d16aa889e4dc" UNIQUE (email);


--
-- TOC entry 5049 (class 2606 OID 17046)
-- Name: utilisateurs UQ_829ae9c2452b0b6bd59cfeb70fd; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.utilisateurs
    ADD CONSTRAINT "UQ_829ae9c2452b0b6bd59cfeb70fd" UNIQUE (nom_utilisateur);


--
-- TOC entry 5059 (class 2606 OID 17107)
-- Name: canal UQ_95a4d5db5f794bf15f4fed64d07; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.canal
    ADD CONSTRAINT "UQ_95a4d5db5f794bf15f4fed64d07" UNIQUE (nom);


--
-- TOC entry 5069 (class 2606 OID 17159)
-- Name: type_menace UQ_a2e14992ae7332b3aba54741a3b; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.type_menace
    ADD CONSTRAINT "UQ_a2e14992ae7332b3aba54741a3b" UNIQUE (nom_menace);


--
-- TOC entry 5093 (class 2606 OID 17386)
-- Name: badges UQ_f77d1346b26adbcdcf6894c27c3; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.badges
    ADD CONSTRAINT "UQ_f77d1346b26adbcdcf6894c27c3" UNIQUE (nom_badge);


--
-- TOC entry 5125 (class 2606 OID 17560)
-- Name: progression FK_0316a66f5527b7d3791fa86cfc7; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.progression
    ADD CONSTRAINT "FK_0316a66f5527b7d3791fa86cfc7" FOREIGN KEY (id_utilisateur) REFERENCES public.utilisateurs(id_utilisateur) ON DELETE CASCADE;


--
-- TOC entry 5121 (class 2606 OID 17540)
-- Name: questions FK_08d309879692aedad5450701e7a; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.questions
    ADD CONSTRAINT "FK_08d309879692aedad5450701e7a" FOREIGN KEY (id_quiz) REFERENCES public.quizzes(id_quiz) ON DELETE CASCADE;


--
-- TOC entry 5108 (class 2606 OID 17475)
-- Name: lien FK_0af605e01882a1dd6c4f36942d5; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lien
    ADD CONSTRAINT "FK_0af605e01882a1dd6c4f36942d5" FOREIGN KEY (id_canal) REFERENCES public.canal(id_canal);


--
-- TOC entry 5106 (class 2606 OID 17470)
-- Name: canaux_utilisateur FK_140e3e5fbc5f06e33b618fcbef9; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.canaux_utilisateur
    ADD CONSTRAINT "FK_140e3e5fbc5f06e33b618fcbef9" FOREIGN KEY (id_canal) REFERENCES public.canal(id_canal);


--
-- TOC entry 5115 (class 2606 OID 17510)
-- Name: notification FK_15e0b16ba387aefc7066f121391; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notification
    ADD CONSTRAINT "FK_15e0b16ba387aefc7066f121391" FOREIGN KEY (id_utilisateur) REFERENCES public.utilisateurs(id_utilisateur);


--
-- TOC entry 5128 (class 2606 OID 17575)
-- Name: badges_utilisateur FK_17fe6f8c6712e0676dccec587ec; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.badges_utilisateur
    ADD CONSTRAINT "FK_17fe6f8c6712e0676dccec587ec" FOREIGN KEY (id_utilisateur) REFERENCES public.utilisateurs(id_utilisateur) ON DELETE CASCADE;


--
-- TOC entry 5117 (class 2606 OID 17530)
-- Name: signalements FK_18c85a7dc66a20a24b233d78427; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.signalements
    ADD CONSTRAINT "FK_18c85a7dc66a20a24b233d78427" FOREIGN KEY (traite_par) REFERENCES public.utilisateurs(id_utilisateur);


--
-- TOC entry 5131 (class 2606 OID 17590)
-- Name: assistant_ia FK_1c7f44fa4fb549fac3d92c62537; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.assistant_ia
    ADD CONSTRAINT "FK_1c7f44fa4fb549fac3d92c62537" FOREIGN KEY (id_utilisateur) REFERENCES public.utilisateurs(id_utilisateur);


--
-- TOC entry 5120 (class 2606 OID 17535)
-- Name: quizzes FK_1ce2960d162e0fd7075cc0c85ba; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.quizzes
    ADD CONSTRAINT "FK_1ce2960d162e0fd7075cc0c85ba" FOREIGN KEY (id_module) REFERENCES public.modules_educatifs(id_module) ON DELETE CASCADE;


--
-- TOC entry 5126 (class 2606 OID 17570)
-- Name: progression FK_26f00a8dd827030ba1a1448a754; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.progression
    ADD CONSTRAINT "FK_26f00a8dd827030ba1a1448a754" FOREIGN KEY (id_quiz) REFERENCES public.quizzes(id_quiz) ON DELETE CASCADE;


--
-- TOC entry 5123 (class 2606 OID 17550)
-- Name: reponses_utilisateur FK_2e68ec52e549763dee9da1bbd25; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reponses_utilisateur
    ADD CONSTRAINT "FK_2e68ec52e549763dee9da1bbd25" FOREIGN KEY (id_utilisateur) REFERENCES public.utilisateurs(id_utilisateur) ON DELETE CASCADE;


--
-- TOC entry 5124 (class 2606 OID 17555)
-- Name: reponses_utilisateur FK_2f48cac576e225323f2497ad3c0; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reponses_utilisateur
    ADD CONSTRAINT "FK_2f48cac576e225323f2497ad3c0" FOREIGN KEY (id_question) REFERENCES public.questions(id_question) ON DELETE CASCADE;


--
-- TOC entry 5118 (class 2606 OID 17525)
-- Name: signalements FK_35cb6eef7ae3b923413ab071874; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.signalements
    ADD CONSTRAINT "FK_35cb6eef7ae3b923413ab071874" FOREIGN KEY (id_analyse) REFERENCES public.analyses_lien(id_analyse);


--
-- TOC entry 5134 (class 2606 OID 17605)
-- Name: user_sessions FK_55912198b81ce1628ee105a6b97; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_sessions
    ADD CONSTRAINT "FK_55912198b81ce1628ee105a6b97" FOREIGN KEY (id_utilisateur) REFERENCES public.utilisateurs(id_utilisateur);


--
-- TOC entry 5113 (class 2606 OID 17500)
-- Name: analyses_menaces FK_5e3d80dfe7d6d0b1d9888bd8335; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.analyses_menaces
    ADD CONSTRAINT "FK_5e3d80dfe7d6d0b1d9888bd8335" FOREIGN KEY (id_analyse) REFERENCES public.analyses_lien(id_analyse) ON DELETE CASCADE;


--
-- TOC entry 5107 (class 2606 OID 17465)
-- Name: canaux_utilisateur FK_6d1ea3df8f5c5bf36013660b9f3; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.canaux_utilisateur
    ADD CONSTRAINT "FK_6d1ea3df8f5c5bf36013660b9f3" FOREIGN KEY (id_utilisateur) REFERENCES public.utilisateurs(id_utilisateur);


--
-- TOC entry 5132 (class 2606 OID 17595)
-- Name: assistant_ia FK_6f2359403182a9d0a1118946cd2; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.assistant_ia
    ADD CONSTRAINT "FK_6f2359403182a9d0a1118946cd2" FOREIGN KEY (id_lien) REFERENCES public.lien(id_lien);


--
-- TOC entry 5133 (class 2606 OID 17600)
-- Name: assistant_ia FK_81e97caf4421ed1e921b92ec65f; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.assistant_ia
    ADD CONSTRAINT "FK_81e97caf4421ed1e921b92ec65f" FOREIGN KEY (id_analyse) REFERENCES public.analyses_lien(id_analyse);


--
-- TOC entry 5104 (class 2606 OID 17460)
-- Name: abonnement FK_8606469a6608c66593c1c2094f8; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.abonnement
    ADD CONSTRAINT "FK_8606469a6608c66593c1c2094f8" FOREIGN KEY (id_plan_abonnement) REFERENCES public.plan_abonnement(id_plan_abonnement);


--
-- TOC entry 5116 (class 2606 OID 17515)
-- Name: notification FK_8840dc7cb75080250f2cf3163c2; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notification
    ADD CONSTRAINT "FK_8840dc7cb75080250f2cf3163c2" FOREIGN KEY (id_analyse) REFERENCES public.analyses_lien(id_analyse);


--
-- TOC entry 5110 (class 2606 OID 17485)
-- Name: analyses_lien FK_999f55868f2c0105c57e8bff51d; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.analyses_lien
    ADD CONSTRAINT "FK_999f55868f2c0105c57e8bff51d" FOREIGN KEY (id_lien) REFERENCES public.lien(id_lien);


--
-- TOC entry 5129 (class 2606 OID 17580)
-- Name: badges_utilisateur FK_afe187abb4f79906117ac53c759; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.badges_utilisateur
    ADD CONSTRAINT "FK_afe187abb4f79906117ac53c759" FOREIGN KEY (id_badge) REFERENCES public.badges(id_badge) ON DELETE CASCADE;


--
-- TOC entry 5135 (class 2606 OID 17610)
-- Name: analytics_events FK_bdd4fd1712ce3f59c62d8ab309d; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.analytics_events
    ADD CONSTRAINT "FK_bdd4fd1712ce3f59c62d8ab309d" FOREIGN KEY (id_utilisateur) REFERENCES public.utilisateurs(id_utilisateur);


--
-- TOC entry 5119 (class 2606 OID 17520)
-- Name: signalements FK_c31bcb54ead484f6b6574760959; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.signalements
    ADD CONSTRAINT "FK_c31bcb54ead484f6b6574760959" FOREIGN KEY (id_utilisateur) REFERENCES public.utilisateurs(id_utilisateur);


--
-- TOC entry 5130 (class 2606 OID 17585)
-- Name: assistance FK_cae85303cea45457d4009ebfdb4; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.assistance
    ADD CONSTRAINT "FK_cae85303cea45457d4009ebfdb4" FOREIGN KEY (id_utilisateur) REFERENCES public.utilisateurs(id_utilisateur);


--
-- TOC entry 5109 (class 2606 OID 17480)
-- Name: lien FK_e3d3d99d59f01ec360d05c39e66; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lien
    ADD CONSTRAINT "FK_e3d3d99d59f01ec360d05c39e66" FOREIGN KEY (id_utilisateur) REFERENCES public.utilisateurs(id_utilisateur);


--
-- TOC entry 5111 (class 2606 OID 17490)
-- Name: analyses_lien FK_e4fa9aa7525421ca78b415387b5; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.analyses_lien
    ADD CONSTRAINT "FK_e4fa9aa7525421ca78b415387b5" FOREIGN KEY (id_utilisateur) REFERENCES public.utilisateurs(id_utilisateur);


--
-- TOC entry 5114 (class 2606 OID 17505)
-- Name: analyses_menaces FK_e7f3c9ef554fd3c95243324fb6b; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.analyses_menaces
    ADD CONSTRAINT "FK_e7f3c9ef554fd3c95243324fb6b" FOREIGN KEY (id_menace) REFERENCES public.type_menace(id_menace) ON DELETE CASCADE;


--
-- TOC entry 5112 (class 2606 OID 17495)
-- Name: analyses_lien FK_ebd7757b3d54b29cf26c2081ee5; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.analyses_lien
    ADD CONSTRAINT "FK_ebd7757b3d54b29cf26c2081ee5" FOREIGN KEY (id_menace) REFERENCES public.type_menace(id_menace);


--
-- TOC entry 5105 (class 2606 OID 17455)
-- Name: abonnement FK_f1462812af403f9bb9e868591eb; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.abonnement
    ADD CONSTRAINT "FK_f1462812af403f9bb9e868591eb" FOREIGN KEY (id_utilisateur) REFERENCES public.utilisateurs(id_utilisateur);


--
-- TOC entry 5122 (class 2606 OID 17545)
-- Name: reponses_possibles FK_f8ac5d1c28913736722e5aae0f1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reponses_possibles
    ADD CONSTRAINT "FK_f8ac5d1c28913736722e5aae0f1" FOREIGN KEY (id_question) REFERENCES public.questions(id_question) ON DELETE CASCADE;


--
-- TOC entry 5127 (class 2606 OID 17565)
-- Name: progression FK_fe47a7ce83be68141c0b150a8c5; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.progression
    ADD CONSTRAINT "FK_fe47a7ce83be68141c0b150a8c5" FOREIGN KEY (id_module) REFERENCES public.modules_educatifs(id_module) ON DELETE CASCADE;


-- Completed on 2026-04-06 16:12:49

--
-- PostgreSQL database dump complete
--

\unrestrict qbOHsEyjefSAnRhEpEHuofb6az0Sa3yedfS1SbKcy2jUl27lkEHhUJMAkJsct4U

-- Completed on 2026-04-06 16:12:49

--
-- PostgreSQL database cluster dump complete
--

