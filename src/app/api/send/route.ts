import { EmailTemplate } from "@/components/EmailTemplates/EmailTemplate";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend("re_dXebPC7b_LPAHJYJLWGev1jDuReRVMCnZ");
export async function POST(req : NextRequest) {
  try {
    const data2 = await req.json();
    console.log(data2.firstName);
    const data = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: [data2.correo],
      subject: data2.asunto,
      react: EmailTemplate({ firstName: data2.firstName, mensaje: data2.mensaje }),
      text: "",
    });
    

    return NextResponse.json({ message: "Se Envio el Mail" }, { status: 200 },
    );
  } catch (error) {
    console.log("error", error)
    return NextResponse.json({ message: "Error" }, { status: 500 },);
  }
}
