import { pgTable, serial, integer} from "drizzle-orm/pg-core";
import categories from "./category.js";
import manufacturers from "./manufacturer.js";

const categoryManufacturer = pgTable("categoryManufacturer", {
    id: serial("id").primaryKey(),
    category_id: integer('category_id').references(() => categories.id, { onDelete: 'cascade' }).notNull(),
    manufacturer_id: integer('manufacturer_id').references(()=> manufacturers.id, {onDelete: 'cascade'}).notNull()
})

export default categoryManufacturer