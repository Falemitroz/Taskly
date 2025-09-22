import { PageFooter, PageFooterText } from "../../styles";
import { LicenseLink } from "../../styles";

function Footer() {
  return (
    <PageFooter>
      <PageFooterText>
        © {new Date().getFullYear()} Taskly | Licensed under{" "}
        <LicenseLink
          to="https://creativecommons.org/licenses/by-nc/4.0/"
          target="_blank"
          rel="noopener noreferrer"
          sx={{ textDecoration: "underline" }}
        >
          CC BY-NC 4.0
        </LicenseLink>
      </PageFooterText>
    </PageFooter>
  );
}

export default Footer;
