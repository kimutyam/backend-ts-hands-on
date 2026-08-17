CREATE TABLE "cart" (
	"customer_id" varchar(26) PRIMARY KEY,
	"sequence_number" integer NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "cart_item" (
	"customer_id" varchar(26),
	"product_id" varchar(26),
	"price" integer NOT NULL,
	"quantity" integer NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "cart_item_pkey" PRIMARY KEY("customer_id","product_id")
);
--> statement-breakpoint
CREATE TABLE "domain_event" (
	"event_id" varchar(26) PRIMARY KEY,
	"occurred_at" timestamp with time zone NOT NULL,
	"sequence_number" integer NOT NULL,
	"event_name" varchar(50) NOT NULL,
	"aggregate_id" varchar(26) NOT NULL,
	"aggregate_name" varchar(50) NOT NULL,
	"payload" jsonb NOT NULL
);
--> statement-breakpoint
CREATE TABLE "order" (
	"order_id" varchar(26) PRIMARY KEY,
	"customer_id" varchar(26) NOT NULL,
	"sequence_number" integer,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "order_item" (
	"order_id" varchar(26),
	"product_id" varchar(26),
	"price" integer NOT NULL,
	"quantity" integer NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "order_item_pkey" PRIMARY KEY("order_id","product_id")
);
--> statement-breakpoint
CREATE TABLE "product" (
	"product_id" varchar(26) PRIMARY KEY,
	"sequence_number" integer NOT NULL,
	"name" varchar(100) NOT NULL CONSTRAINT "product_name_unique" UNIQUE,
	"price" integer NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "cart_item" ADD CONSTRAINT "cart_item_customer_id_cart_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "cart"("customer_id") ON DELETE RESTRICT ON UPDATE RESTRICT;--> statement-breakpoint
ALTER TABLE "order_item" ADD CONSTRAINT "order_item_order_id_order_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "order"("order_id") ON DELETE CASCADE ON UPDATE CASCADE;
