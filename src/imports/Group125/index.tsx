import svgPaths from "./svg-usr9yf9ru9";

function Circle({ className }: { className?: string }) {
  return (
    <div className={className || "overflow-clip relative size-[16px]"} data-name="Circle">
      <div className="absolute inset-[8.33%]" data-name="Icon">
        <div className="absolute inset-[-6%]">
          <svg className="block size-full" fill="none" height="14.9333" preserveAspectRatio="none" viewBox="0 0 14.9333 14.9333" width="14.9333">
            <path d={svgPaths.p24c5e00} id="Icon" stroke="#1E1E1E" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Group() {
  return (
    <div className="absolute h-[6340.293px] left-0 top-0 w-[7432.623px]">
      <div className="absolute inset-[-0.12%_0_-0.12%_-0.1%]">
        <svg className="block size-full" fill="none" height="6355.29" preserveAspectRatio="none" viewBox="0 0 7440.12 6355.29" width="7440.12">
          <g id="Group 111">
            <path d={svgPaths.p36c09100} fill="#8A2128" id="Vector 254" stroke="#8A2128" strokeWidth="15" />
            <path d={svgPaths.p39a16100} fill="#8A2128" id="Vector 255" stroke="#8A2128" strokeWidth="15" />
            <path d={svgPaths.p229cc1f0} fill="url(#paint0_linear_0_8)" id="Vector 256" />
          </g>
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_0_8" x1="4799.92" x2="7151.81" y1="1636.1" y2="754.536">
              <stop stopColor="#9D991B" />
              <stop offset="1" stopColor="#9EBC1E" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}

export default function Group1() {
  return (
    <div className="contents relative size-full">
      <Group />
      <div className="absolute h-[1119.5px] left-0 top-0 w-[2623px]">
        <svg className="absolute block inset-0 size-full" fill="none" height="1119.5" preserveAspectRatio="none" viewBox="0 0 2623 1119.5" width="2623">
          <path d={svgPaths.p9939780} fill="#B9DF14" id="Vector 265" />
        </svg>
      </div>
      <div className="absolute flex h-[1779.861px] items-center justify-center left-0 top-0 w-[1818.773px]">
        <div className="-scale-y-100 flex-none rotate-[-30.49deg]">
          <div className="h-[1259.292px] relative w-[1369.132px]">
            <svg className="absolute block inset-0 size-full" fill="none" height="1259.29" preserveAspectRatio="none" viewBox="0 0 1369.13 1259.29" width="1369.13">
              <path d={svgPaths.p1cb15900} fill="#FEE9E7" id="Vector 266" />
            </svg>
          </div>
        </div>
      </div>
      <Circle className="absolute left-0 overflow-clip size-[16px] top-0" />
    </div>
  );
}