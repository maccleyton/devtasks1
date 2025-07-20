interface MessageProps {
  text: string;
  type?: 'success' | 'error' | '';
}

export function Message({ text, type = '' }: MessageProps) {
  if (!text) return null;

  return <p className={`message ${type}`}>{text}</p>;
}