import { Controller } from "react-hook-form";
import { ReflectionHelper } from "./reflection-helper";

/** Form-ийн FieldError-оос FormValidateProps-ийг бэлтгэж авах */
function createBaseRequired(error) {
  return {
    message: error ? error.message : undefined,
  };
}

/** Form-ийн FormValidateProps-ийг бэлтгэж өгөх */
export function createValidateProps(formState, field, state) {
  const propertyName = field.name;
  const { errors, isSubmitted } = formState;

  const errorField = state.error
    ? state.error
    : ReflectionHelper.getObjectReflect(errors, propertyName);

  const requiredState = createBaseRequired(errorField);

  const result = {
    ...requiredState,
    invalid: state.invalid,
    isDirty: state.isDirty,
    isTouched: isSubmitted || state.isTouched,
  };

  return result;
}

/** Form-ийн FormValidateProps-ийг бэлтгэж өгөх */
export function createFormValidateProps(state, propertyName) {
  const { errors, isSubmitted, dirtyFields } = state;

  const errorField = ReflectionHelper.getObjectReflect(errors, propertyName);

  const dirty = ReflectionHelper.getObjectReflect(dirtyFields, propertyName);

  const result = {
    ...createBaseRequired(errorField),
    invalid: errorField ? true : false,
    isTouched: isSubmitted,
    isDirty: dirty,
  };

  return result;
}
/** Form-ийн FormValidateProps утгагыг нь шалгаж container дээр ямар class нэмж өгөхийг тохируулах */
export function getContainerStyleName(baseClassName, state) {
  const { invalid } = state;

  let result = baseClassName;

  result += invalid ? "ant-form-item-with-help ant-form-item-has-error" : "";
  // result += isDirty ? " field-dirty" : "";
  // result += isTouched ? " field-touched" : "";

  return result;
}

/** Form-ийн Controller бэлтгэж авах */
export function createController(props, callBackRender) {
  const { name, control, defualtValue } = props;
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defualtValue ? defualtValue : undefined}
      render={(state) => {
        return callBackRender(state.field, state.fieldState);
      }}
    ></Controller>
  );
}
