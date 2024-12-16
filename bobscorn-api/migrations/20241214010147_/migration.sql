-- CreateTable
CREATE TABLE "CornPurchases" (
    "id" SERIAL NOT NULL,
    "client_id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "purchase_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CornPurchases_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CornPurchases_client_id_key" ON "CornPurchases"("client_id");


DROP FUNCTION IF EXISTS validate_and_insert_purchase(text, numeric, interval, numeric);

CREATE OR REPLACE FUNCTION public.validate_and_insert_purchase(
    _client_id text,
    _quantity numeric,
    _time_limit interval,
    _error_code numeric
)
RETURNS void
LANGUAGE plpgsql
AS $function$
DECLARE
    last_purchase_time TIMESTAMP;
BEGIN
    -- Obtenemos la última hora de compra del cliente
    SELECT purchase_time
    INTO last_purchase_time
    FROM "CornPurchases"
    WHERE client_id = _client_id
    ORDER BY purchase_time DESC
    LIMIT 1;

    -- Validamos si se cumple el tiempo límite
    IF last_purchase_time IS NOT NULL THEN
        IF last_purchase_time + _time_limit > NOW() THEN
            RAISE EXCEPTION 'Error Code: %, Purchase Limit Exceeded: %. Wait %', _error_code, _client_id, _time_limit;
        END IF;
    END IF;

    -- Inserta o actualiza si ya existe el cliente
    INSERT INTO "CornPurchases" (client_id, quantity, purchase_time)
    VALUES (_client_id, _quantity, NOW())
    ON CONFLICT (client_id)
    DO UPDATE
    SET 
        quantity = "CornPurchases".quantity + EXCLUDED.quantity, -- Suma al valor actual
        purchase_time = EXCLUDED.purchase_time; -- Actualiza el tiempo de compra
END;
$function$;
