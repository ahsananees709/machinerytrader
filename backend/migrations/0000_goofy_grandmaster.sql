CREATE TABLE "categories" (
	"id" integer PRIMARY KEY NOT NULL,
	"title" varchar
);
--> statement-breakpoint
CREATE TABLE "categoryManufacturer" (
	"id" serial PRIMARY KEY NOT NULL,
	"category_id" integer NOT NULL,
	"manufacturer_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "manufacturers" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar
);
--> statement-breakpoint
CREATE TABLE "vehicles" (
	"id" serial PRIMARY KEY NOT NULL,
	"url" text NOT NULL,
	"name" varchar NOT NULL,
	"condition" varchar,
	"horsepower" varchar,
	"hours_meter" varchar,
	"stock_number" varchar,
	"year" varchar,
	"location" varchar,
	"state" varchar,
	"serial_number" varchar,
	"model" varchar,
	"description" text,
	"images" text[] DEFAULT ARRAY[]::text[] NOT NULL,
	"category_id" integer,
	"manufacturer_id" integer
);
--> statement-breakpoint
ALTER TABLE "categoryManufacturer" ADD CONSTRAINT "categoryManufacturer_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "categoryManufacturer" ADD CONSTRAINT "categoryManufacturer_manufacturer_id_manufacturers_id_fk" FOREIGN KEY ("manufacturer_id") REFERENCES "public"."manufacturers"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "vehicles" ADD CONSTRAINT "vehicles_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "vehicles" ADD CONSTRAINT "vehicles_manufacturer_id_manufacturers_id_fk" FOREIGN KEY ("manufacturer_id") REFERENCES "public"."manufacturers"("id") ON DELETE cascade ON UPDATE no action;