export class QualitativeScoreboardSummary {
    id : any;
    scoreCardId: any;
    accountId: any;
    numberOfApplicant: any;
    icustScorecardMapping : Testing[];
    createdDate: any;
    createdBy: any;
    lastModifiedDate: any;
    lastModifiedBy: any;
}

interface Testing {
    id: any;
    scoreCardId: any;
    scoreCardQuestId: any;
    scoreCardAnswer: any;

    scoreCardMappingId: any;
    scoreCardQuestionId: any;
    attributeType: any;
    isRequired: any;
    scorecardQuestion: any;
    scorecardAnswers: any;
    scorecardAnswer: any;
    validationName: any;
}