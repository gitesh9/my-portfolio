import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AiChatModal } from './ai-chat-modal';

describe('AiChatModal', () => {
    let component: AiChatModal;
    let fixture: ComponentFixture<AiChatModal>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AiChatModal]
        })
            .compileComponents();

        fixture = TestBed.createComponent(AiChatModal);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
