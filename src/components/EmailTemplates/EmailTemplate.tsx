import * as React from 'react';

interface EmailTemplateProps {
  firstName: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  firstName,
}) => (
  <div>
    <h1>Hola, {firstName}!</h1>
    <p> Te invitamos a participar en la siguiente actividad :</p>
  </div>
);
