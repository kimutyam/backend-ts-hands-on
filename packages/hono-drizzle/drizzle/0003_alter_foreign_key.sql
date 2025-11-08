ALTER TABLE "cart" DROP CONSTRAINT "cart_customer_id_customer_customer_id_fk";
--> statement-breakpoint
ALTER TABLE "cart_item" DROP CONSTRAINT "cart_item_customer_id_customer_customer_id_fk";
--> statement-breakpoint
ALTER TABLE "cart_item" DROP CONSTRAINT "cart_item_product_id_product_product_id_fk";
--> statement-breakpoint
ALTER TABLE "order" DROP CONSTRAINT "order_customer_id_customer_customer_id_fk";
--> statement-breakpoint
ALTER TABLE "order_item" DROP CONSTRAINT "order_item_product_id_product_product_id_fk";
--> statement-breakpoint
ALTER TABLE "cart_item" ADD CONSTRAINT "cart_item_customer_id_cart_customer_id_fk" FOREIGN KEY ("customer_id") REFERENCES "public"."cart"("customer_id") ON DELETE restrict ON UPDATE restrict;
