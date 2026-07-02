/**
 * IOB Forms – Barrel Export (Phase 2 – Section 5)
 *
 * Primary control components: Button, TextInput, Select, Switch
 * Legacy components (backward compat): Toggle, Checkbox, PasswordInput,
 *   SearchInput, Textarea, SelectLegacy, TextInputLegacy
 *
 * Usage:
 *   import { Button, TextInput, Select, Switch } from '@/components/forms';
 */

/* ------------------------------------------------------------------ */
/* Section 5 – New Primary Controls                                    */
/* ------------------------------------------------------------------ */

export {
  Button,
  Toggle,
  Checkbox,
  type ButtonProps,
  type ButtonVariant,
  type ButtonSize,
  type ToggleProps,
  type CheckboxProps,
} from './Controls';

export {
  TextInput,
  Select,
  Switch,
  TextInputLegacy,
  PasswordInput,
  SearchInput,
  Textarea,
  SelectLegacy,
  type TextInputProps,
  type SelectProps,
  type SwitchProps,
  type TextInputLegacyProps,
  type PasswordInputProps,
  type SearchInputProps,
  type TextareaProps,
  type SelectLegacyProps,
} from './Inputs';
