import TrashSvg from "components/BoxTrash.svg";
import "components/BoxTrash.css";

const Trash = ({ className }) => (
  <g id="trash" className={className}>
    <rect x={0} y={0} width={80} height={80} />
    <image x={0} y={0} width={80} height={80} href={TrashSvg} />
  </g>
);

export default function BoxTrash({ visible, windowWidth }) {
  return <Trash className={visible ? "visible" : "invisible"} />;
}
