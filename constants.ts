import { RelationshipType, ProposalStyle } from './types';

export const TEMPLATES: Record<ProposalStyle, (sender: string, recipient: string) => string> = {
  [ProposalStyle.SWEET]: (s, r) => `My dearest ${r},\n\nFrom the moment I met you, my world became brighter. You are my sunshine and my anchor. I can't imagine a future without your smile.\n\nWill you make me the happiest person alive?`,
  [ProposalStyle.PASSIONATE]: (s, r) => `${r},\n\nYou set my soul on fire. Every beat of my heart belongs to you. I want to build a life, a legacy, and a forever with you.\n\nBe mine, forever?`,
  [ProposalStyle.POETIC]: (s, r) => `To ${r},\n\nLike the stars need the night sky, I need you. You are the poetry in a world of prose, the melody in the silence.\n\nLet's write our masterpiece together.`,
  [ProposalStyle.MOVIE]: (s, r) => `${r},\n\nIf our life was a movie, this would be the scene where I realize I can't live without you. You had me at "Hello".\n\nWill you be my leading star?`,
  [ProposalStyle.ADVENTURE]: (s, r) => `Hey ${r},\n\nLife is the greatest adventure, but it means nothing without the right co-pilot. Let's conquer mountains and navigate the seas of life together.\n\nReady for our next chapter?`,
  [ProposalStyle.TIMELESS]: (s, r) => `My beloved ${r},\n\nIn a world that changes fast, my love for you is the one constant. It is quiet, deep, and enduring. I promise to stand by you through all of life's seasons.\n\nWill you spend forever with me?`,
  [ProposalStyle.DESTINY]: (s, r) => `${r},\n\nI don't believe in coincidences. The universe conspired to bring us together. Our souls recognized each other instantly. It was always meant to be us.\n\nLet's fulfill our destiny together.`,
  
  [ProposalStyle.FRIENDSHIP_FIRST]: (s, r) => `Dear ${r},\n\nWe've been through so much as friends. You know me better than anyone. I've realized that my best friend is also the love of my life.\n\nCan we be more than friends?`,
  [ProposalStyle.FUNNY]: (s, r) => `Hey ${r},\n\nI promise to always kill the spiders, open the jars, and give you the fries at the bottom of the bag. I'll even pretend to like your bad music.\n\nLet's make this official?`,
  [ProposalStyle.SINCERE]: (s, r) => `${r},\n\nI value our bond more than anything. I want to be the person who supports your dreams and holds your hand through it all.\n\nWill you be my partner in everything?`,
  [ProposalStyle.NOSTALGIC]: (s, r) => `To ${r},\n\nLooking back at all our memories, I realize they all share one thing: You were the best part of them. Every laugh, every trip, every quiet moment.\n\nLet's make a lifetime of new memories.`,
  [ProposalStyle.SUPPORTIVE]: (s, r) => `${r},\n\nYou are the strongest, most amazing person I know. I want to be your rock, just as you have been mine. Through highs and lows, I'll be there.\n\nLet's face the world together.`,
  [ProposalStyle.PARTNER_IN_CRIME]: (s, r) => `Yo ${r},\n\nFrom our craziest adventures to our quietest moments, there's no one I'd rather have by my side. We make the perfect team.\n\nReady to upgrade our partnership status?`,
  [ProposalStyle.GROWTH]: (s, r) => `Dear ${r},\n\nWe've watched each other grow, learn, and evolve. I admire the person you are becoming, and I want to be there for every version of you yet to come.\n\nLet's keep growing, together.`,
  
  [ProposalStyle.CUSTOM]: (s, r) => `Dearest ${r},\n\n[Your custom message here...]`
};

export const STYLE_OPTIONS = {
  [RelationshipType.ROMANTIC]: [
    ProposalStyle.SWEET,
    ProposalStyle.PASSIONATE,
    ProposalStyle.POETIC,
    ProposalStyle.MOVIE,
    ProposalStyle.ADVENTURE,
    ProposalStyle.TIMELESS,
    ProposalStyle.DESTINY,
    ProposalStyle.CUSTOM
  ],
  [RelationshipType.FRIENDSHIP]: [
    ProposalStyle.FRIENDSHIP_FIRST,
    ProposalStyle.FUNNY,
    ProposalStyle.SINCERE,
    ProposalStyle.NOSTALGIC,
    ProposalStyle.SUPPORTIVE,
    ProposalStyle.PARTNER_IN_CRIME,
    ProposalStyle.GROWTH,
    ProposalStyle.CUSTOM
  ]
};