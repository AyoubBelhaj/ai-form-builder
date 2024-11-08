import { InferSelectModel } from "drizzle-orm";
import { forms, questions, fieldOptions } from "@/db/schema";

type FormSelectModel = InferSelectModel<typeof forms>
type QuestionSelectModel = InferSelectModel<typeof questions>
type FieldOptionsSelectModel = InferSelectModel<typeof fieldOptions>