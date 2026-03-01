import { Props } from "./type";

export const ModalContainer = ({ children, title, subtitile }: Props) => {
  return (
    <div className="bg-white rounded-lg flex flex-col gap-2">
      <div className="flex flex-col bg-primary-o p-2 rounded-t-lg">
        <p className="text-white description-body-bold">{title}</p>
        {subtitile && (
          <p className="text-white description-body-sm">{subtitile}</p>
        )}
      </div>
      <div className="p-3">{children}</div>
    </div>
  );
};
