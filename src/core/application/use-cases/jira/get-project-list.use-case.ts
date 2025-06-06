import { ProjectManagementService } from '@/core/infrastructure/adapters/services/platformIntegration/projectManagement.service';
import { IntegrationsCommon } from '@/core/infrastructure/http/controllers/jira.controller';
import { PlatformType } from '@/shared/domain/enums/platform-type.enum';
import { IUseCase } from '@/shared/domain/interfaces/use-case.interface';
import { Inject } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

export class GetProjectsListUseCase implements IUseCase {
    constructor(
        private readonly projectManagementService: ProjectManagementService,

        @Inject(REQUEST)
        private readonly request: Request & {
            user: { organization: { uuid: string } };
        },
    ) {}

    async execute(domainSelected: IntegrationsCommon) {
        return this.projectManagementService.getProject(
            {
                domainSelected,
                organizationId: this.request.user.organization.uuid,
            },
            PlatformType.JIRA,
        );
    }
}
