import {
  Body,
  Heading,
  Hr,
  Container,
  Img,
  Tailwind,
} from "@react-email/components";
const GeneralMailer = ({ verificationCode }: { verificationCode: number }) => {
  return (
    <div>
      <Tailwind>
        <Body className=" text-black py-5 px-2 border-5 border-gray-100 bg-gray-white  w-full">
          <Container className="py-auto border-3 border-gray-100 ">
            <Heading className="h-16">
              <Img
                className="h-20 w-1/2 object-cover"
                src="https://res.cloudinary.com/dkckrpwew/image/upload/v1726595270/logo_transparent_jxwxhn.png"
                alt="logo"
              />
            </Heading>

            <p className="text-sm">
              Hi there 👋, I'm Chris from STEADYBILL. Check you password reset
              code below
            </p>
            <Hr className="border-gray-100 w-full" />
            <div className="relative w-full flex justify-center h-20 border border-red-500 items-center place-items-center">
              <p className="text-2xl text-center text-purple-700">
                {verificationCode}
              </p>
            </div>

            <Hr />

            <Container className="px-2 text-purple-800">
              <p>
                All trademarks, service marks, and company names are the
                property of STEADYBILL Inc.
              </p>
              <p className="text-sm font-normal">
                STEADYBILL Inc. {new Date().getFullYear()} &copy;
              </p>
            </Container>
          </Container>
        </Body>
      </Tailwind>
    </div>
  );
};

export default GeneralMailer;
