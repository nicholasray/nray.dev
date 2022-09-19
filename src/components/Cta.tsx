import Container from "./Container";
import ViewportPadding from "./ViewportPadding";
import RoundDivider from "../../public/round-divider.svg";
import stackCloudImage from "../../public/stack-cloud.svg?url";
import Heading from "./Heading";
import Paragraph from "./Paragraph";
import ButtonIconImage from "../../public/button-icon.svg";

const CONVERTKIT_FORM_URL =
  "https://app.convertkit.com/forms/3512386/subscriptions";
const DEFAULT_DESCRIPTION = `Subscribe to my newsletter and I'll let you know when new posts are released and share additional insights that can help your frontend development career.
`;

interface CtaProps {
  showDivider?: boolean;
  description?: string;
}

const Cta = ({
  showDivider = false,
  description = DEFAULT_DESCRIPTION,
}: CtaProps) => {
  return (
    <section className="relative mt-28 bg-gray-900 pb-20 pt-80 text-gray-400 sm:pb-32 md:mt-32 md:pb-40 md:pt-96 lg:mt-[8.375rem] lg:pt-40">
      <ViewportPadding>
        <Container>
          {showDivider && (
            <RoundDivider className="absolute left-0 -top-px w-full rotate-180" />
          )}
          <div className="grid grid-cols-1 justify-items-center text-center lg:grid-cols-2 lg:gap-x-8 lg:text-left">
            <div className="flex justify-center lg:col-start-2">
              <img
                src={stackCloudImage}
                alt="Stack cloud image"
                className="absolute top-0 w-64 -translate-y-[28%] md:w-72 lg:w-80"
              />
            </div>
            <div className="lg:col-start-1">
              <Heading color="white">
                Become a better{" "}
                <span className="text-gradient">frontend developer</span>
              </Heading>
              <Paragraph className="whitespace-pre-line" color="lightGray">
                {description}
              </Paragraph>
              <form
                action={CONVERTKIT_FORM_URL}
                method="post"
                className="mt-14 flex max-w-2xl items-center"
              >
                <div className="relative flex w-full items-center">
                  <input
                    type="email"
                    name="email_address"
                    required
                    className="shadow-inner-10 h-16 w-full rounded-full bg-gray-100 py-2 pl-7 pr-40 font-medium text-gray-900 placeholder:text-slate-600"
                    placeholder="Enter your email"
                  />
                  <button
                    type="submit"
                    className="absolute right-1 flex h-14 items-center rounded-full bg-purple-600 py-4 px-5 font-medium text-white hover:bg-purple-500"
                  >
                    <ButtonIconImage className="mr-2" />
                    Subscribe
                  </button>
                </div>
              </form>
            </div>
          </div>
        </Container>
      </ViewportPadding>
    </section>
  );
};

export default Cta;
