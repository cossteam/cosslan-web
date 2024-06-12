import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {z} from "zod"

import {Button} from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group"
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {LanguageTool, LanguageList} from "@/components/language.tsx";
import {ThemeList, ThemeTool} from "@/components/theme.tsx";
import {uiState} from "@/lib/state.ts";
import {useToast} from "@/components/ui/use-toast.ts";

const appearanceFormSchema = z.object({
  language: z.enum(['', ...LanguageList.map((item) => item.type)], {
    invalid_type_error: "Select a language",
    required_error: "Please select a language.",
  }),
  theme: z.enum(['', ...ThemeList.map((item) => item)], {
    required_error: "Please select a theme.",
  }),
})

type AppearanceFormValues = z.infer<typeof appearanceFormSchema>

export default function AppearanceForm() {
  const { toast } = useToast()

  const defaultValues: Partial<AppearanceFormValues> = {
    language: uiState.getState().language,
    theme: uiState.getState().theme,
  }

  const form = useForm<AppearanceFormValues>({
    resolver: zodResolver(appearanceFormSchema),
    defaultValues,
  })

  async function onSubmit(data: AppearanceFormValues) {
    ThemeTool.setTheme(data.theme);
    LanguageTool.setLanguage(data.language);
    toast({
      description: "Update successful.",
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="language"
          render={({field}) => (
            <FormItem>
              <FormLabel>Language</FormLabel>
              <div className="relative w-max">
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}>
                    <SelectTrigger className="w-[200px] appearance-none font-normal">
                      <SelectValue placeholder="Select a language"/>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {LanguageList.map((language, key) => (
                          <SelectItem key={key} value={language.type}>{language.label}</SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
              </div>
              <FormDescription>
                Set the language you want to use in the dashboard.
              </FormDescription>
              <FormMessage/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="theme"
          render={({field}) => (
            <FormItem className="space-y-1">
              <FormLabel>Theme</FormLabel>
              <FormDescription>
                Select the theme for the dashboard.
              </FormDescription>
              <FormMessage/>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="grid max-w-xl grid-cols-3 gap-8 pt-2"
              >
                <FormItem>
                  <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
                    <div className="items-center rounded-md border-2 border-muted p-1 hover:border-accent">
                      <div className="space-y-2 rounded-sm bg-[#ecedef] p-2">
                        <div className="space-y-2 rounded-md bg-white p-2 shadow-sm">
                          <div className="h-2 w-[80px] max-w-[80%] rounded-lg bg-[#ecedef]"/>
                          <div className="h-2 w-[100px] max-w-[100%] rounded-lg bg-[#ecedef]"/>
                        </div>
                        <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                          <div className="h-4 w-4 rounded-full bg-[#ecedef]"/>
                          <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]"/>
                        </div>
                        <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                          <div className="h-4 w-4 rounded-full bg-[#ecedef]"/>
                          <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]"/>
                        </div>
                      </div>
                    </div>
                    <div className="flex w-full p-2 justify-center items-center">
                      <FormControl>
                        <RadioGroupItem value="light" className="sr-only"/>
                      </FormControl>
                      <span className="pl-1.5">Light</span>
                    </div>
                  </FormLabel>
                </FormItem>
                <FormItem>
                  <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
                    <div className="items-center rounded-md border-2 border-muted bg-popover p-1 hover:bg-accent hover:text-accent-foreground">
                      <div className="space-y-2 rounded-sm bg-slate-950 p-2">
                        <div className="space-y-2 rounded-md bg-slate-800 p-2 shadow-sm">
                          <div className="h-2 w-[80px] max-w-[80%] rounded-lg bg-slate-400"/>
                          <div className="h-2 w-[100px] max-w-[100%] rounded-lg bg-slate-400"/>
                        </div>
                        <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
                          <div className="h-4 w-4 rounded-full bg-slate-400"/>
                          <div className="h-2 w-[100px] rounded-lg bg-slate-400"/>
                        </div>
                        <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
                          <div className="h-4 w-4 rounded-full bg-slate-400"/>
                          <div className="h-2 w-[100px] rounded-lg bg-slate-400"/>
                        </div>
                      </div>
                    </div>
                    <div className="flex w-full p-2 justify-center items-center">
                      <FormControl>
                        <RadioGroupItem value="dark" className="sr-only"/>
                      </FormControl>
                      <span className="pl-1.5">Dark</span>
                    </div>
                  </FormLabel>
                </FormItem>
                <FormItem>
                  <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
                    <div className="items-center rounded-md border-2 border-muted bg-popover p-1 hover:bg-accent hover:text-accent-foreground">
                      <div className="space-y-2 rounded-sm bg-slate-950 p-2">
                        <div className="relative rounded-md bg-slate-800 p-2 shadow-sm">
                          <div className="absolute z-10 top-0 right-0 bottom-0 left-[50%] bg-[#ecedef] rounded-r-sm"></div>
                          <div className="relative z-20 h-2 w-[80px] max-w-[80%] rounded-lg bg-slate-400"/>
                          <div className="relative z-20 h-2 mt-2 w-[100px] max-w-[100%] rounded-lg bg-slate-400"/>
                        </div>
                        <div className="relative flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
                          <div className="absolute z-10 top-0 right-0 bottom-0 left-[50%] bg-[#ecedef] rounded-r-sm"></div>
                          <div className="relative z-20 h-4 w-4 rounded-full bg-slate-400"/>
                          <div className="relative z-20 h-2 w-[100px] rounded-lg bg-slate-400"/>
                        </div>
                        <div className="relative flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
                          <div className="absolute z-10 top-0 right-0 bottom-0 left-[50%] bg-[#ecedef] rounded-r-sm"></div>
                          <div className="relative z-20 h-4 w-4 rounded-full bg-slate-400"/>
                          <div className="relative z-20 h-2 w-[100px] rounded-lg bg-slate-400"/>
                        </div>
                      </div>
                    </div>
                    <div className="flex w-full p-2 justify-center items-center">
                      <FormControl>
                        <RadioGroupItem value="system" className="sr-only"/>
                      </FormControl>
                      <span className="pl-1.5">System</span>
                    </div>
                  </FormLabel>
                </FormItem>
              </RadioGroup>
            </FormItem>
          )}
        />

        <Button type="submit">Update preferences</Button>
      </form>
    </Form>
  )
}
