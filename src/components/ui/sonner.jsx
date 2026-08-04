import { Toaster as Sonner } from "sonner";

function Toaster(props) {
  return (
    <Sonner
      position="top-right"
      closeButton
      toastOptions={{
        classNames: {
          toast:
            "rounded-2xl border bg-white p-4 shadow-sm font-sans text-sm text-[#3B2A22]",
          title: "font-semibold text-[#3B2A22]",
          description: "text-muted-foreground",
          closeButton:
            "border-input bg-white text-muted-foreground hover:bg-muted",
          success:
            "border-emerald-200 bg-emerald-50 [&_[data-icon]]:text-emerald-600",
          error:
            "border-destructive/30 bg-destructive/5 [&_[data-icon]]:text-destructive",
          warning:
            "border-amber-200 bg-amber-50 [&_[data-icon]]:text-amber-600",
          info: "border-sky-200 bg-sky-50 [&_[data-icon]]:text-sky-600",
        },
      }}
      {...props}
    />
  );
}

export { Toaster };
