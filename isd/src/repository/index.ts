import InterestRepository from './interest.repo';
import LeadRepository from './lead.repo';

export default class ISDRepository {
  lead: LeadRepository;
  interest: InterestRepository;

  constructor() {
    this.lead = new LeadRepository();
    this.interest = new InterestRepository();

    // create counter
  }
}
