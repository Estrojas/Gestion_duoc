import * as React from 'react';

interface EmailTemplateProps {
  firstName: string;
  mensaje: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  firstName, mensaje
}) => (
  <div>
    <h1>Hola, {firstName}!</h1>
    <p>{mensaje}</p>
  </div>
);
