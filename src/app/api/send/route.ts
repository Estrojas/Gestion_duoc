import { EmailTemplate } from "@/components/EmailTemplates/EmailTemplate";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend("re_dXebPC7b_LPAHJYJLWGev1jDuReRVMCnZ");
export async function POST() {
  try {
    const data = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: ["est.rojaso@duocuc.cl"],
      subject: "Te Tenemos un mensaje de Duoc",
      react: EmailTemplate({ firstName: "Usuario" }),
      text: "",
    });
    console.log(data);

    return NextResponse.json({ message: "Se Envio el Mail" }, { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ message: "Error" }, { status: 500 },);
  }
}
