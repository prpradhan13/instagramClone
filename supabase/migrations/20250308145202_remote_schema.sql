drop trigger if exists "trigger_decrease_hashtag_count" on "public"."posts";

drop trigger if exists "trigger_handle_hashtags" on "public"."posts";

drop policy "Anyone can view hashtags" on "public"."hashtags";

drop policy "Users cannot manually create or edit hashtags" on "public"."hashtags";

drop policy "Users cannot update hashtags" on "public"."hashtags";

revoke delete on table "public"."hashtags" from "anon";

revoke insert on table "public"."hashtags" from "anon";

revoke references on table "public"."hashtags" from "anon";

revoke select on table "public"."hashtags" from "anon";

revoke trigger on table "public"."hashtags" from "anon";

revoke truncate on table "public"."hashtags" from "anon";

revoke update on table "public"."hashtags" from "anon";

revoke delete on table "public"."hashtags" from "authenticated";

revoke insert on table "public"."hashtags" from "authenticated";

revoke references on table "public"."hashtags" from "authenticated";

revoke select on table "public"."hashtags" from "authenticated";

revoke trigger on table "public"."hashtags" from "authenticated";

revoke truncate on table "public"."hashtags" from "authenticated";

revoke update on table "public"."hashtags" from "authenticated";

revoke delete on table "public"."hashtags" from "service_role";

revoke insert on table "public"."hashtags" from "service_role";

revoke references on table "public"."hashtags" from "service_role";

revoke select on table "public"."hashtags" from "service_role";

revoke trigger on table "public"."hashtags" from "service_role";

revoke truncate on table "public"."hashtags" from "service_role";

revoke update on table "public"."hashtags" from "service_role";

alter table "public"."hashtags" drop constraint "hashtags_tag_key";

alter table "public"."profiles" drop constraint "profiles_username_key";

alter table "public"."profiles" drop constraint "username_length";

drop function if exists "public"."decrease_hashtag_count"();

drop function if exists "public"."handle_hashtags"();

alter table "public"."hashtags" drop constraint "hashtags_pkey";

drop index if exists "public"."hashtags_pkey";

drop index if exists "public"."hashtags_tag_key";

drop index if exists "public"."profiles_username_key";

drop table "public"."hashtags";

alter table "public"."posts" drop column "hashtags";

alter table "public"."profiles" drop column "username";

alter table "public"."profiles" drop column "website";

alter table "public"."profiles" add column "bio" text;

alter table "public"."profiles" add column "email" text;

alter table "public"."profiles" add column "user_name" text;

alter table "public"."reels" drop column "hashtags";

alter table "public"."stories" alter column "content_url" drop not null;

alter table "public"."stories" alter column "expires_at" set default (now() + '24:00:00'::interval);

alter table "public"."stories" alter column "expires_at" set data type timestamp with time zone using "expires_at"::timestamp with time zone;

CREATE UNIQUE INDEX profiles_email_key ON public.profiles USING btree (email);

CREATE UNIQUE INDEX profiles_username_key ON public.profiles USING btree (user_name);

alter table "public"."profiles" add constraint "profiles_email_key" UNIQUE using index "profiles_email_key";

alter table "public"."profiles" add constraint "profiles_username_key" UNIQUE using index "profiles_username_key";

alter table "public"."profiles" add constraint "username_length" CHECK ((char_length(user_name) >= 3)) not valid;

alter table "public"."profiles" validate constraint "username_length";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$begin
  insert into public.profiles (id, full_name, user_name, email, avatar_url)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'user_name', new.email, new.raw_user_meta_data->>'avatar_url');
  return new;
end;$function$
;


