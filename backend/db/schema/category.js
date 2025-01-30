import { pgTable, varchar, integer, text} from "drizzle-orm/pg-core";

const categories = pgTable("categories", {
    id: integer("id").primaryKey(),
    title: varchar("title"),
    image: text("image"),
})

export default categories