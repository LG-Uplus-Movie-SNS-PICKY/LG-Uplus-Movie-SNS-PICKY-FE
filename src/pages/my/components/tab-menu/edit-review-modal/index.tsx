// pages/my/components/tab-menu/edit-review-modal/index.tsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Container,
    TitleContainer,
    Badge,
    Text,
    Star,
    SpoilerContainer,
    YesNoButtonContainer,
    YesNoButton,
    Wrapper,
    ReviewInputContainer,
    ReviewInput,
    EditButton,
    WithinText,
    TextCountWrapper,
    TextCountContainer,
    CountText,
    MaxText,
    EditModalBackground,
    ModalBackground,
    ModalWrapper
} from './index.styles';
import { Toast } from '@stories/toast'
import { Modal } from '@stories/modal'
import { LineReviewData } from '../review';

interface EditReviewModalProps {
    review: LineReviewData;
    onClose: () => void;
    onSave: (updatedReview: { context: string; isSpoiler: boolean }) => void;
}

const EditReviewModal = ({ review, onClose, onSave }: EditReviewModalProps) => {
    const [toast, setToast] = useState<{ message: string; direction: 'none' | 'up' | 'down' } | null>(null);
    const [initialContext, setInitialContext] = useState(review.context); // 초기 감상평 값
    const [initialIsSpoiler, setInitialIsSpoiler] = useState(review.isSpoiler || false); // 초기 스포일러 여부

    const [context, setContext] = useState(review.context);
    const [isSpoiler, setIsSpoiler] = useState(review.isSpoiler || false);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

    const showToast = (message: string, direction: 'none' | 'up' | 'down') => {
        setToast({ message, direction });
        setTimeout(() => setToast(null), 2000);
    };

    const handleStarClick = () => {
        showToast('별점은 수정할 수 없습니다.', 'none'); // 별점 클릭 시 메시지 표시
    };

    const hasChanges = () => {
        return context.length > 0 && context.length <= 50 && (context !== initialContext || isSpoiler !== initialIsSpoiler);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (context.length === 0) {
                showToast('한줄평은 1자 이상 작성하셔야 합니다.', 'none');
                return;
            }
            if (!hasChanges()) {
                showToast('변경사항이 없습니다.', 'none');
                return;
            }
            onSave({ context, isSpoiler });
        }
    };

    const handleContextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        if (value.length > 50) {
            showToast('한줄평은 최대 50자까지 입력 가능합니다.', 'none');
            return;
        }

        setContext(value);
    };

    const handleCloseModal = () => {
        // 한줄평 길이가 0인 경우에도 모달을 띄움
        if (hasChanges() || context.trim().length === 0) {
            setIsConfirmModalOpen(true); // 확인 모달 열기
        } else {
            onClose(); // 변경사항이 없으면 바로 닫기
        }
    };

    const handleConfirmClose = () => {
        setIsConfirmModalOpen(false);
        onClose(); // "나가기" 선택 시 모달 닫기
    };

    const handleCancelClose = () => {
        setIsConfirmModalOpen(false); // 확인 모달 닫기
    };

    return (
        <EditModalBackground onClick={handleCloseModal}>
            <Container onClick={(e) => e.stopPropagation()}>
                <TitleContainer>
                    <Badge>한줄평</Badge>
                    <Text>별점을 선택해주세요.</Text>
                    <div>
                        {Array.from({ length: 5 }, (_, index) => (
                            <Star key={index} active={index < review.rating}>
                                ★
                            </Star>
                        ))}
                    </div>
                </TitleContainer>
                <SpoilerContainer>
                    <Text>감상평에 스포일러가 포함되어 있나요?</Text>
                    <YesNoButtonContainer>
                        <YesNoButton
                            active={isSpoiler === true}
                            onClick={() => setIsSpoiler(true)}
                        >
                            있음
                        </YesNoButton>
                        <YesNoButton
                            active={isSpoiler === false}
                            onClick={() => setIsSpoiler(false)}
                        >
                            없음
                        </YesNoButton>
                    </YesNoButtonContainer>
                </SpoilerContainer>
                <Wrapper>
                    <ReviewInputContainer>
                        <ReviewInput
                            value={context}
                            onChange={handleContextChange}
                            onKeyDown={handleKeyDown}
                            placeholder="한줄평을 작성해주세요."
                        />
                        <EditButton
                            onClick={() => onSave({ context, isSpoiler })}
                            active={hasChanges()}
                        >
                            수정
                        </EditButton>
                    </ReviewInputContainer>
                    <TextCountWrapper>
                        <TextCountContainer>
                            <CountText>{context.length}</CountText>
                            <MaxText>/50</MaxText>
                        </TextCountContainer>
                    </TextCountWrapper>
                </Wrapper>
                {toast && <Toast message={toast.message} direction={toast.direction} />}
            </Container>

            {isConfirmModalOpen && (
                <ModalBackground onClick={(e) => e.stopPropagation()}>
                    <ModalWrapper>
                        <Modal
                            message="변경사항이 저장되지 않을 수 있습니다. 나가시겠습니까?"
                            confirmText="나가기"
                            cancelText="아니오"
                            onConfirm={handleConfirmClose}
                            onCancel={handleCancelClose}
                        />
                    </ModalWrapper>
                </ModalBackground>
            )}
        </EditModalBackground>
    );
};

export default EditReviewModal;
