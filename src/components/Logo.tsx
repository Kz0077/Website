import Group1 from "../imports/Group125";

export default function Logo({ height = 32 }: { height?: number }) {
  // 原始从 Figma 导出的组件内部是绝对定位，且带有超大的分辨率（7432 x 6340）。
  // 为了让它能完美适配网页上的任何地方，我们使用一个自适应包装器，将其等比缩小。
  const scale = height / 6340.293;
  const width = 7432.623 * scale;
  
  return (
    <div 
      className="relative overflow-hidden inline-block shrink-0" 
      style={{ width, height }}
      aria-label="Serasé Logo"
      title="Serasé"
    >
      <div 
        className="absolute top-0 left-0 origin-top-left"
        style={{ transform: `scale(${scale})` }}
      >
        <Group1 />
      </div>
    </div>
  );
}
