import { CommunicationService } from '@/core/infrastructure/adapters/services/platformIntegration/communication.service';
import { IUseCase } from '@/shared/domain/interfaces/use-case.interface';
import { Inject } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

export class CreateOrUpdateIntegrationConfigUseCase implements IUseCase {
    constructor(
        private readonly communication: CommunicationService,

        @Inject(REQUEST)
        private readonly request: Request & {
            user: { organization: { uuid: string } };
        },
    ) {}

    public async execute(params: any): Promise<any> {
        return await this.communication.createOrUpdateIntegrationConfig(
            {
                ...params,
                organizationId: this.request?.user?.organization?.uuid,
            },
            params.integrationType,
        );
    }
}
