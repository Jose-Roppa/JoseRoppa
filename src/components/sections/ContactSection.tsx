import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Check, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  name: z.string().min(2, { message: "Nome deve ter pelo menos 2 caracteres" }),
  email: z.string().email({ message: "Email inválido" }),
  message: z.string().min(10, { message: "Mensagem deve ter pelo menos 10 caracteres" }),
});

type FormData = z.infer<typeof formSchema>;

const ContactSection = () => {
  const [formState, setFormState] = useState<"idle" | "submitting" | "success" | "error">("idle");
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });
  
  const onSubmit = async (data: FormData) => {
    setFormState("submitting");
    
    try {
      // Simulando envio de formulário
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Em um caso real, aqui você faria uma chamada para um backend
      // await fetch('/api/contact', {
      //   method: 'POST',
      //   body: JSON.stringify(data),
      //   headers: {
      //     'Content-Type': 'application/json'
      //   }
      // });
      
      setFormState("success");
      reset();
      setTimeout(() => setFormState("idle"), 3000);
    } catch (error) {
      setFormState("error");
      setTimeout(() => setFormState("idle"), 3000);
    }
  };

  return (
    <section id="contact" className="py-20 px-4 relative">
      <div className="container mx-auto max-w-5xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-center mb-16 bg-clip-text text-transparent 
            light:bg-gradient-to-r light:from-pink-500 light:to-rose-500
            dark:bg-gradient-to-r dark:from-purple-400 dark:to-pink-500"
        >
          Entre em Contato
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-semibold text-white">Vamos conversar!</h3>
            <p className="text-gray-300 leading-relaxed">
              Estou sempre aberto a novas oportunidades, projetos e colaborações.
              Se você quiser conversar sobre tecnologia, desenvolvimento ou qualquer outra ideia, 
              sinta-se à vontade para entrar em contato!
            </p>
            
            <div className="space-y-4 pt-4">
              <a
                href="mailto:je.croppa@gmail.com"
                className="flex items-center gap-3 text-purple-300 hover:text-purple-400 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <path d="M22 6l-10 7L2 6" />
                  </svg>
                </div>
                <span>je.croppa@gmail.com</span>
              </a>
              
              <a
                href="https://github.com/joseroppa"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-purple-300 hover:text-purple-400 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                  </svg>
                </div>
                <span>github.com/joseroppa</span>
              </a>
              
              <a
                href="https://linkedin.com/in/joseroppa"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-purple-300 hover:text-purple-400 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect x="2" y="9" width="4" height="12" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </div>
                <span>linkedin.com/in/joseroppa</span>
              </a>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="
              light:bg-white/80 light:backdrop-blur-lg light:p-8 light:rounded-2xl light:border light:border-pink-100 light:shadow-lg
              dark:bg-black/30 dark:backdrop-blur-lg dark:p-8 dark:rounded-2xl dark:border dark:border-white/10 dark:shadow-lg"
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-200 mb-1">
                  Nome
                </label>
                <Input
                  id="name"
                  {...register("name")}
                  className={`bg-black/50 border ${errors.name ? 'border-red-500' : 'border-gray-700'} text-white`}
                  placeholder="Seu nome"
                  disabled={formState === "submitting"}
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-1">
                  Email
                </label>
                <Input
                  id="email"
                  {...register("email")}
                  className={`bg-black/50 border ${errors.email ? 'border-red-500' : 'border-gray-700'} text-white`}
                  placeholder="seu@email.com"
                  disabled={formState === "submitting"}
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-200 mb-1">
                  Mensagem
                </label>
                <Textarea
                  id="message"
                  {...register("message")}
                  className={`bg-black/50 border ${errors.message ? 'border-red-500' : 'border-gray-700'} text-white min-h-[120px]`}
                  placeholder="Sua mensagem..."
                  disabled={formState === "submitting"}
                />
                {errors.message && (
                  <p className="mt-1 text-xs text-red-500">{errors.message.message}</p>
                )}
              </div>
              
              <Button
                type="submit"
                disabled={formState === "submitting"}
                className="w-full 
                  light:bg-gradient-to-r light:from-pink-500 light:to-rose-500 
                  dark:bg-gradient-to-r dark:from-purple-600 dark:to-pink-600 
                  text-white border-none 
                  light:hover:from-pink-600 light:hover:to-rose-600
                  dark:hover:from-purple-700 dark:hover:to-pink-700 
                  transition-all duration-300"
              >
                {formState === "idle" && (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Enviar Mensagem
                  </>
                )}
                {formState === "submitting" && (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Enviando...
                  </>
                )}
                {formState === "success" && (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Mensagem Enviada!
                  </>
                )}
                {formState === "error" && (
                  <>
                    <AlertCircle className="mr-2 h-4 w-4" />
                    Erro! Tente novamente
                  </>
                )}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
