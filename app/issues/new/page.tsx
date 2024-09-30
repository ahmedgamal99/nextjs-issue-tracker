"use client"; // Ensure the whole file is treated as a client-side component

import React, { useState } from "react";
import { Button, TextField, Callout } from "@radix-ui/themes";
import dynamic from "next/dynamic";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";

// Dynamically import SimpleMDE with SSR disabled
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), { ssr: false }); // This is because SimpleMDE tries to access the DOM, and anything that tries to access the DOM can't be SSR.

interface IssueForm {
  title: string;
  description: string;
}
const NewIssuePage = () => {
  const { register, control, handleSubmit } = useForm<IssueForm>();

  const router = useRouter();

  const [error, setError] = useState("");

  return (
    <div className="max-w-xl ">
      {error && (
        <Callout.Root className="mb-5" color="red">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form
        className="space-y-3"
        onSubmit={handleSubmit(async (data) => {
          try {
            await axios.post("/api/issues", data);
            router.push("/issues");
          } catch (error) {
            setError("An Unexpected Error Occured");
          }
        })}
      >
        <TextField.Root placeholder="Title" {...register("title")} />
        <Controller
          name="description"
          control={control}
          defaultValue="" // Add a default value for the description
          render={({ field }) => (
            <SimpleMDE
              {...field}
              value={field.value || ""} // Set the value to the controlled state
              onChange={field.onChange} // Call the onChange from react-hook-form
              placeholder="Description"
            />
          )}
        />
        <Button>Submit New Issue</Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
