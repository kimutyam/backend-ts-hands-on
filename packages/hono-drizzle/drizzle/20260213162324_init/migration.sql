CREATE TABLE "cart" (
	"customer_id" varchar(26) PRIMARY KEY NOT NULL,
	"sequence_number" integer NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "cart_item" (
	"customer_id" varchar(26) NOT NULL,
	"product_id" varchar(26) NOT NULL,
	"price" integer NOT NULL,
	"quantity" integer NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "cart_item_customer_id_product_id_pk" PRIMARY KEY("customer_id","product_id")
);
--> statement-breakpoint
CREATE TABLE "domain_event" (
	"event_id" varchar(26) PRIMARY KEY NOT NULL,
	"occurred_at" timestamp with time zone NOT NULL,
	"sequence_number" integer NOT NULL,
	"event_name" varchar(50) NOT NULL,
	"aggregate_id" varchar(26) NOT NULL,
	"aggregate_name" varchar(50) NOT NULL,
	"payload" jsonb NOT NULL
);
--> statement-breakpoint
CREATE TABLE "order" (
	"order_id" varchar(26) PRIMARY KEY NOT NULL,
	"customer_id" varchar(26) NOT NULL,
	"sequence_number" integer,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "order_item" (
	"order_id" varchar(26) NOT NULL,
	"product_id" varchar(26) NOT NULL,
	"price" integer NOT NULL,
	"quantity" integer NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "order_item_order_id_product_id_pk" PRIMARY KEY("order_id","product_id")
);
--> statement-breakpoint
CREATE TABLE "product" (
	"product_id" varchar(26) PRIMARY KEY NOT NULL,
	"sequence_number" integer NOT NULL,
	"name" varchar(100) NOT NULL,
	"price" integer NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "product_name_unique" UNIQUE("name")
);
--> statement-breakpoint
ALTER TABLE "cart_item" ADD CONSTRAINT "cart_item_customer_id_cart_customer_id_fk" FOREIGN KEY ("customer_id") REFERENCES "public"."cart"("customer_id") ON DELETE restrict ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE "order_item" ADD CONSTRAINT "order_item_order_id_order_order_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."order"("order_id") ON DELETE cascade ON UPDATE cascade;
