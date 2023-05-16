import React, {
  Children,
  cloneElement,
  useEffect,
  useRef,
  useState,
} from 'react';
import Keyboard from 'react-simple-keyboard';
import { useKeyboardContext } from '../keyboard';

import 'react-simple-keyboard/build/css/index.css';

interface Props {
  children?: JSX.Element;
  value?: string;
  onChangeInput?: (e: any) => void;
  onEnter?: () => void;
  onHide?: (action: boolean) => void;
}

const KeyboardInput: React.FC<Props> = ({
  children,
  value,
  onChangeInput,
  onEnter,
  onHide,
}) => {
  const { isKeyboardVisible, setKeyboardVisible } = useKeyboardContext();
  const [layout, setLayout] = useState<string>('english');
  const [langLayout, setLangLayout] = useState<'english'>(
    'english'
  );
  const keyboard = useRef<any>(null);

  useEffect(() => {
    function clickHandler(e: any) {
      console.log(e.target.classList);
      if (
        !e.target.classList.contains('MuiInput-root') &&
        !(e.target.nodeName === 'INPUT') &&
        !e.target.classList.contains('hg-button') &&
        !e.target.classList.contains('hg-row') &&
        !e.target.classList.contains('keyboard-wrapper')
      ) {
        if (onHide) {
          onHide(false);
        }
        setKeyboardVisible(false);
      }
    }

    window.addEventListener('click', clickHandler);
    return window.removeEventListener('click', clickHandler, true);
  }, []);

  const onChange = (input: any) => {
    if (onChangeInput) {
      onChangeInput(input);
    }
  };

  const onKeyPress = (button: any) => {
    if (button.includes('{') && button.includes('}')) {
      handleLayoutChange(button);
    }
  };

  function handleLayoutChange(button: string) {
    let layoutName: string = layout;
    switch (button) {
      case '{shift}':
      case '{shiftactivated}':
        layoutName = layout === 'shift' ? langLayout : 'shift';
        break;

      case '{default}':
        layoutName = langLayout;
        break;

      case '{alt}':
      case '{altright}':
        layoutName = layout === 'alt' ? langLayout : 'alt';
        break;

      case '{enter}':
        if (onEnter) {
          onEnter();
        }
        setKeyboardVisible(false);
        break;

      case '{lang}':
        layoutName = 'english';
        break;

      default:
        break;
    }

    if (button === '{lang}') {
      setLangLayout('english');
    }

    setLayout(layoutName);
  }

  const getShiftLayout = (): string[] => {
    const layouts: {
      english: string[];
      [key: string]: string[];
    } = {
      english: [
        'Q W E R T Y U I O P {bksp}',
        'A S D F G H J K L {enter}',
        '{shiftactivated} Z X C V B N M , . {shiftactivated}',
        '{alt} {lang} {space} {altright}',
      ],
    };
    return layouts[langLayout];
  };

  useEffect(() => {
    keyboard.current.setInput(value);
  }, [value]);

  return (
    <div className="keyboard-input">
      {children
        ? Children.map(children, (child) => {
            return cloneElement(child, {
              onFocus: () => {
                setKeyboardVisible(true);
              },
              ...child.props,
            });
          })
        : null}
      <div
        className={'keyboard-wrapper ' + (isKeyboardVisible ? 'visible' : '')}
        onClick={(e) => e.stopPropagation()}
      >
        <Keyboard
          keyboardRef={(r) => (keyboard.current = r)}
          layoutName={layout}
          defaultValue={value}
          value={value}
          layout={{
            english: [
              'q w e r t y u i o p {bksp}',
              'a s d f g h j k l {enter}',
              '{shift} z x c v b n m , . {shift}',
              '{alt} {lang} {space} {altright}',
            ],
            shift: getShiftLayout(),
            alt: [
              '1 2 3 4 5 6 7 8 9 0 {bksp}',
              `@ # $ & * ( ) ' " {enter}`,
              '{shift} % - + = / ; : ! ? {shift}',
              '{default} {lang} {space} {back}',
            ],
          }}
          display={{
            '{alt}': '.?123',
            '{smileys}': '\uD83D\uDE03',
            '{shift}': '⇧',
            '{shiftactivated}': '⇧',
            '{enter}': '↵ Enter',
            '{bksp}': '⌫',
            '{altright}': '.?123',
            '{lang}': '\uD83C\uDF10',
            '{space}': ' ',
            '{default}': 'ABC',
            '{back}': '⇦',
          }}
          theme="hg-theme-default hg-theme-ios"
          onChange={onChange}
          onKeyPress={onKeyPress}
        />
      </div>
    </div>
  );
};

export default KeyboardInput;
