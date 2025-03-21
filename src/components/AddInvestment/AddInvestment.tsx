import { useState } from "react";
import { Resolver, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "../ui/dialog";
import { useAddInvestmentMutation } from "../../Redux/Slices/investmentApi";
import { InvestmentFormData } from "../../lib/types";
import { useTranslation } from "react-i18next";

// Validation Schema
const schema = yup.object({
  name: yup.string().required("Investment name is required"),
  amount: yup
    .number()
    .typeError("Amount must be a number")
    .positive("Amount must be greater than 0")
    .required("Amount is required"),
    document: yup.mixed().notRequired(),
});

export default function AddInvestmentModal() {
    const {t} = useTranslation()
   
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<InvestmentFormData>({
    resolver: yupResolver(schema) as Resolver<InvestmentFormData>,
  });

  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [addInvestment, { isLoading }] = useAddInvestmentMutation()
 
  const onSubmit = async (data: InvestmentFormData) => {
    try {
      const payload = {
        name: data.name,
        amount: data.amount,
        document: file || null, // Handle file separately if API requires it
      };
  
      await addInvestment(payload).unwrap();
      alert("Investment added successfully!");
  
      reset(); // Reset form
      setFile(null); // Reset file state
      setOpen(false); // Close modal
    } catch (error) {
      console.error("Failed to add investment", error);
    }
  };
  const handleFileUploadWarning = (e: React.MouseEvent<HTMLInputElement>) => {
    const userConfirmed = confirm(
      "Note: The backend does not support file upload at the moment. This is just a mock process."
    );
    if (!userConfirmed) {
      e.preventDefault(); // Prevents the file dialog from opening
    }
  };
  

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-500 text-white my-10 border-0"> {t("add_investment")} +</Button>
      </DialogTrigger>
      <DialogContent className="max-w-md p-6">
        <DialogTitle className="text-xl font-bold my-2">
        {t("add_investment")}
        </DialogTitle>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name Field */}
          <div>
            <label className="block font-semibold my-2">{t("investmentname")}</label>
            <Input {...register("name")} />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div>

          {/* Amount Field */}
          <div>
            <label className="block font-semibold my-2">{t("amount")} ($)</label>
            <Input type="number" {...register("amount")} />
            {errors.amount && (
              <p className="text-red-500">{errors.amount.message}</p>
            )}
          </div>

          {/* File Upload Field */}
          <div>
            <label className="block font-semibold my-2">{t("upload_doc")}</label>
            <Input
            onClick={handleFileUploadWarning}
  type="file"
  accept=".pdf,.docx,.jpg,.png"
  onChange={(e) => setFile(e.target.files?.[0] || null)}
/>
            {errors.document && (
              <p className="text-red-500">{errors.document.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full" disabled={isSubmitting || isLoading}>
            {isSubmitting || isLoading ? "Submitting..." :   t("add_investment")}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
