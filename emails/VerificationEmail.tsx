import {
  Html,
  Head,
  Font,
  Preview,
  Heading,
  Row,
  Section,
  Text,
} from "@react-email/components";

interface VerificationEmailProps {
  username: string;
  otp: string;
}

export default function VerificationEmail({
  username,
  otp,
}: VerificationEmailProps) {
  const APP_URL = process.env.APP_URL;
  const verifyUrl = `${APP_URL}/verify/${encodeURIComponent(username)}`;

  const styles = {
    outer: {
      backgroundColor: "#0f1724",
      color: "#e6eef8",
      fontFamily: "Roboto, Verdana, sans-serif",
      padding: "32px 0",
    },
    container: {
      maxWidth: 600,
      margin: "0 auto",
      background: "#0b1220",
      borderRadius: 12,
      overflow: "hidden",
      boxShadow: "0 8px 30px rgba(2,6,23,0.6)",
    },
    header: {
      padding: "28px 32px",
      background: "linear-gradient(90deg,#7c3aed 0%,#3b82f6 100%)",
      color: "white",
      display: "flex",
      alignItems: "center",
      gap: 12,
    },
    brandTitle: {
      fontSize: 20,
      margin: 0,
      fontWeight: 700,
      letterSpacing: "-0.2px",
    },
    content: {
      padding: "28px 32px",
      color: "#cbd5e1",
      lineHeight: 1.5,
    },
    otpBox: {
      marginTop: 18,
      marginBottom: 18,
      padding: "14px 18px",
      background: "#071025",
      borderRadius: 8,
      display: "inline-block",
      fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, monospace",
      fontSize: 20,
      color: "#a7f3d0",
      letterSpacing: 4,
    },
    otpRow: {
      display: "flex",
      justifyContent: "center" as const,
      marginTop: 8,
      marginBottom: 8,
    },
    verifyButton: {
      display: "inline-block",
      marginTop: 12,
      textDecoration: "none",
      borderRadius: 10,
      padding: "12px 20px",
      background: "linear-gradient(90deg,#8b5cf6 0%,#06b6d4 100%)",
      color: "#061025",
      fontWeight: 700,
    },
    verifyButtonRow: {
      display: "flex",
      justifyContent: "center" as const,
      marginTop: 8,
    },
    footer: {
      padding: "18px 32px",
      fontSize: 12,
      color: "#94a3b8",
      background: "#061025",
      textAlign: "center" as const,
    },
    small: { color: "#6b7280" },
  };

  return (
    <Html lang="en" dir="ltr">
      <Head>
        <title>EchoVault — Verification Code</title>
        <Font
          fontFamily="Roboto"
          fallbackFontFamily="Verdana"
          webFont={{
            url: "https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2",
            format: "woff2",
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>

      <Preview>Your EchoVault verification code: {otp}</Preview>

      <Section style={styles.outer}>
        <div style={styles.container}>
          <Section style={styles.header}>
            <svg
              width="36"
              height="36"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden
            >
              <path
                d="M12 2l7 3v5c0 5.523-3.582 10.74-7 12-3.418-1.26-7-6.477-7-12V5l7-3z"
                fill="white"
                opacity="0.95"
              />
            </svg>

            <div>
              <Heading style={styles.brandTitle}>EchoVault</Heading>
              <div
                style={{
                  fontSize: 12,
                  marginTop: 4,
                  color: "rgba(255,255,255,0.85)",
                }}
              >
                Verify your email to finish signing up
              </div>
            </div>
          </Section>

          <Section style={styles.content}>
            <Row>
              <Text style={{ fontSize: 16, marginBottom: 6, color: "#e6eef8" }}>
                Hi {username},
              </Text>
            </Row>

            <Row>
              <Text>
                Thanks for creating an EchoVault account. Use the code below to
                verify your email address. This code will expire in 10 minutes.
              </Text>
            </Row>

            <Row style={styles.otpRow}>
              <div style={styles.otpBox}>{otp}</div>
            </Row>

            <Row style={styles.verifyButtonRow}>
              <a href={verifyUrl} style={styles.verifyButton}>
                Verify your account
              </a>
            </Row>

            <Row>
              <Text style={{ marginTop: 16 }}>
                If you didn&apos;t request this, you can safely ignore this
                message. For help, reply to{" "}
                <span style={{ color: "#93c5fd" }}>
                  support@echovault.leonardo1903.me
                </span>
                .
              </Text>
            </Row>
          </Section>

          <Section style={styles.footer}>
            <Text style={{ margin: 0 }}>
              EchoVault — anonymous feedback, built with care.
            </Text>
            <Text style={{ marginTop: 6, color: "#7c8aa6" }}>
              <span style={styles.small}>
                © {new Date().getFullYear()} leonardo1903.me
              </span>
            </Text>
          </Section>
        </div>
      </Section>
    </Html>
  );
}
