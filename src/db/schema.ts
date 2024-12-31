import { integer, text, pgTable, pgEnum, serial, timestamp  } from "drizzle-orm/pg-core";
import { relations } from 'drizzle-orm';

export const sourceType = pgEnum('source_type', ['notion', 'pdf', 'url']);

export const sources = pgTable("sources", {
  id: serial("id").primaryKey(),
  type: sourceType("type").notNull(),
  identifier: text("identifier").notNull(),
  lastSyncAt: timestamp("last_sync_at").defaultNow(),
});

export const assessments = pgTable("assessments", {
  id: serial("id").primaryKey(),
  sourceId: integer("sourceId").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const assessmentsRelations = relations(assessments, ({ many, one }) => ({
    assessmentQuestions: many(assessmentsQuestions),
    source: one(sources, {
    fields: [assessments.sourceId],
    references: [sources.id],
    }),
}));

export const questionType = pgEnum('question_type', ['multiple-choice', 'free-text', 'radio']);

export const questions = pgTable('questions', {
  id: serial('id').primaryKey(),
  sourceId: integer('source_id').references(() => sources.id).notNull(),
  type: questionType('type').default('radio'),
  text: text('text').notNull(),
  options: text('options').array().notNull(),
  correctAnswer: text('correct_answer').array().notNull(),
});

export const questionsRelations = relations(questions, ({ many, one }) => ({
    assessmentQuestions: many(assessmentsQuestions),
    source: one(sources, {
      fields: [questions.sourceId],
      references: [sources.id],
    }),
}));

export const assessmentsQuestions = pgTable('assessments_questions', {
  id: serial('id').primaryKey(),
  assessmentId: integer('assessment_id').references(() => assessments.id).notNull(),
  questionId: integer('question_id').references(() => questions.id).notNull(),
});

export const assessmentsQuestionsRelations = relations(assessmentsQuestions, ({ one }) => ({
    assessment: one(assessments, {
      fields: [assessmentsQuestions.assessmentId],
      references: [assessments.id],
    }),
    question: one(questions, {
      fields: [assessmentsQuestions.questionId],
      references: [questions.id],
    }),
}));


export type SelectSource = typeof sources.$inferSelect
export type SelectQuestion = typeof questions.$inferSelect