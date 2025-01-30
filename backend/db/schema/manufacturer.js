import { pgTable, varchar, serial} from "drizzle-orm/pg-core";

const manufacturers = pgTable("manufacturers", {
    id: serial("id").primaryKey(),
    title: varchar("title"),
})

export default manufacturers