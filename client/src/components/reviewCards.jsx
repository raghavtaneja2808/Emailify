import { cn } from "@/lib/utils";
import { Marquee } from "@/components/magicui/marquee";
const reviews = [
    {
      name: "Aarav Mehta",
      username: "@aaravm",
      body: "Emailify streamlined our survey process and helped us understand our customers better. Highly recommended!",
      img: "https://i.pravatar.cc/150?img=12",
    },
    {
      name: "Sophia Patel",
      username: "@sophiap",
      body: "Emailify made collecting customer feedback seamless! The insights we got helped us improve our service drastically.",
      img: "https://i.pravatar.cc/150?img=1",
    },
    {
      name: "Riya Sharma",
      username: "@riyash",
      body: "We used Emailify for our market research, and the results were outstanding. Super easy to use and very effective!",
      img: "https://i.pravatar.cc/150?img=5",
    },
    {
      name: "Vikram Iyer",
      username: "@vikrami",
      body: "The surveys are well-structured and easy to distribute. Emailify has become a crucial tool for our business growth.",
      img: "https://i.pravatar.cc/150?img=9",
    },
    {
      name: "Aditya Rao",
      username: "@adityar",
      body: "We saw a 40% increase in customer engagement after using Emailify surveys. Game changer for us!",
      img: "https://i.pravatar.cc/150?img=17",
    },
    {
      name: "Neha Kapoor",
      username: "@nehak",
      body: "The analytics and reports provided by Emailify are top-notch. We now understand our customers better than ever!",
      img: "https://i.pravatar.cc/150?img=23",
    },
    {
      name: "Kabir Joshi",
      username: "@kabirj",
      body: "Creating surveys was so simple! The real-time insights helped us tweak our marketing strategy effectively.",
      img: "https://i.pravatar.cc/150?img=29",
    },
    {
      name: "Aisha Khan",
      username: "@aishak",
      body: "Emailify's survey customization options are fantastic. We were able to match them perfectly with our brand identity!",
      img: "https://i.pravatar.cc/150?img=33",
    },
  ];
  

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({ img, name, username, body }) => {
  return (
    <figure
      className={cn(
        "relative h-full w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <img className="rounded-full" width="32" height="32" alt="" src={img} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {name}
          </figcaption>
          <p className="text-xs font-medium dark:text-white/40">{username}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm">{body}</blockquote>
    </figure>
  );
};

export function MarqueeDemo() {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
      <Marquee pauseOnHover className="[--duration:20s]">
        {firstRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:20s]">
        {secondRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
    </div>
  );
}
