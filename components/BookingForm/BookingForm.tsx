"use client";
import { createBookingRequest, CreateBookingRequestBody } from "@/lib/api";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import { useParams } from "next/navigation";
import { useId } from "react";
import * as yup from "yup";
import css from "./BookingForm.module.css";
import Button from "../Button/Button";
import toast from "react-hot-toast";

const validationSchema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
});

const initialValues: CreateBookingRequestBody = {
  name: "",
  email: "",
};

export default function BookingForm() {
  const id = useId();
  const { camperId } = useParams<{ camperId: string }>();
  const handleSubmit = async (
    values: CreateBookingRequestBody,
    actions: FormikHelpers<CreateBookingRequestBody>,
  ) => {
    try {
      if (!camperId) return;
      const response = await createBookingRequest(camperId, values);

      toast.success(response.message, {
        duration: 3000,
      });

      actions.resetForm();
    } catch {
      toast.error("Camper not found");
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {({ isSubmitting }) => (
        <Form className={css.form}>
          <div className={css.inputWrapper}>
            <label className={css.visuallyHidden} htmlFor={`${id}-name`}>
              Name
            </label>
            <Field
              id={`${id}-name`}
              type="text"
              name="name"
              placeholder="Name&#42;"
              className={css.input}
            />
            <ErrorMessage name="name" component="span" className={css.error} />
          </div>

          <div className={css.inputWrapper}>
            <label className={css.visuallyHidden} htmlFor={`${id}-email`}>
              Email
            </label>
            <Field
              id={`${id}-email`}
              type="email"
              name="email"
              placeholder="Email&#42;"
              className={css.input}
            />
            <ErrorMessage name="email" component="span" className={css.error} />
          </div>

          <Button
            className={css.submitButton}
            type="submit"
            text={isSubmitting ? "Sending..." : "Send"}
            disabled={isSubmitting}
          />
        </Form>
      )}
    </Formik>
  );
}