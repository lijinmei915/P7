export interface ChangeSubItem {
  id: string; // e.g., 'width', 'height', 'align-items'
  label: string; // e.g., '宽度'
  value: string; // e.g., '分配剩余空间'
  onDelete: () => void;
}

export interface ChangeRecord {
  id: string;
  category: 'element' | 'rule' | 'text' | 'token' | 'legacy';
  title: string;
  description?: string;
  subItems?: ChangeSubItem[];
  rawText: string;
  onDelete: () => void;
}
