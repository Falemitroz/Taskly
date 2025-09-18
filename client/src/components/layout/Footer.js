import { PageFooter, PageFooterText } from "../../styles";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <PageFooter>
      <PageFooterText>
        © {new Date().getFullYear()} Taskly | Licensed under{" "}
        <Link
          to="https://creativecommons.org/licenses/by-nc/4.0/"
          target="_blank"
          rel="noopener noreferrer"
          sx={{ textDecoration: "underline" }}
        >
          CC BY-NC 4.0
        </Link>
      </PageFooterText>
    </PageFooter>
  );
}

export default Footer;
