var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, jsxs as _jsxs } from "@emotion/react/jsx-runtime";
// pages/movie-detail/components/share-modal/index.tsx
import { useState } from 'react';
import { ModalContainer, ModalContent, ModalTitle, UrlDisplay, CopyButton } from './index.styles';
const ShareModal = ({ url, onClose }) => {
    const [copySuccess, setCopySuccess] = useState('');
    const handleCopy = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield navigator.clipboard.writeText(url);
            setCopySuccess('URL이 복사되었습니다!');
            setTimeout(() => {
                setCopySuccess('');
            }, 2000);
        }
        catch (err) {
            setCopySuccess('복사 실패!');
        }
    });
    const handleOutsideClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };
    return (_jsx(ModalContainer, { onClick: handleOutsideClick, children: _jsxs(ModalContent, { onClick: e => e.stopPropagation(), children: [_jsx(ModalTitle, { children: "URL \uBCF5\uC0AC\uD558\uAE30" }), _jsx(UrlDisplay, { children: url }), _jsx(CopyButton, { onClick: handleCopy, children: copySuccess || '복사' })] }) }));
};
export default ShareModal;
