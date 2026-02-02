export type Category = 'Student Motivation' | 'Exam Tactics' | 'Parent Corner' | 'Math in Real Life';

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  content: string; // Markdown or HTML
  coverImage: string;
  category: Category;
  author: string;
  publishDate: string;
  readTime: string;
}

export const articles: Article[] = [
  {
    slug: 'unleash-your-inner-math-genius',
    title: 'ปลุกความเป็นอัจฉริยะในตัวคุณ: คณิตศาสตร์ไม่ได้ยากอย่างที่คิด',
    excerpt: 'ค้นพบวิธีเปลี่ยนมุมมองที่มีต่อคณิตศาสตร์ จากยาขมกลายเป็นขนมหวาน ด้วยเทคนิคการปรับ Mindset ง่ายๆ ที่ใครก็ทำได้',
    content: `
      <h2>ทำไมเราถึงกลัวคณิตศาสตร์?</h2>
      <p>เคยสงสัยไหมว่าทำไมแค่เห็นตัวเลข สมองก็สั่งการให้เรา "หนี" ทันที? จริงๆ แล้วมันไม่ได้เกี่ยวกับความฉลาด แต่เกี่ยวกับ "ความรู้สึก" ที่เรามีต่อมัน</p>
      <p>คณิตศาสตร์คือภาษาของจักรวาล เป็นศิลปะที่มีรูปแบบชัดเจน เมื่อเราเข้าใจ "ที่มา" ของสูตรต่างๆ เราจะเลิกท่องจำและเริ่ม "ทำความเข้าใจ"</p>
      
      <h3>3 วิธีเปลี่ยน Mindset ให้รักเลข</h3>
      <ul>
        <li><strong>มองหาคณิตรอบตัว:</strong> เวลาจ่ายตลาด, ดูนาฬิกา, หรือแม้แต่ฟังเพลง จังหวะดนตรีก็คือคณิตศาสตร์</li>
        <li><strong>อนุญาตให้ตัวเองผิดพลาด:</strong> การแก้โจทย์ผิดคือส่วนหนึ่งของการเรียนรู้ อย่ากลัวที่จะขีดฆ่ากระดาษทด</li>
        <li><strong>แข่งกับตัวเอง:</strong> ไม่ต้องเทียบเกรดกับใคร แค่เราเข้าใจมากกว่าเมื่อวาน ก็คือความสำเร็จแล้ว</li>
      </ul>
      <blockquote>"Mathematics is not about numbers, equations, computations, or algorithms: it is about understanding." - William Paul Thurston</blockquote>
    `,
    coverImage: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&q=80&w=2000',
    category: 'Student Motivation',
    author: 'Kru Heem',
    publishDate: '28 Jan 2026',
    readTime: '5 min read'
  },
  {
    slug: 'exam-prep-secret-technique',
    title: '5 เทคนิคลับ เตรียมสอบยังไงให้ติดชัวร์ (ฉบับคนเวลาน้อย)',
    excerpt: 'เจาะลึกเทคนิค Pomodoro และ Spaced Repetition ที่จะช่วยจำสูตรได้แม่นยำขึ้น 300% โดยไม่ต้องอ่านหนังสือโต้รุ่ง',
    content: `
      <h2>อ่านน้อยแต่ได้มาก ทำได้จริงหรือ?</h2>
      <p>คำตอบคือ "จริง" ถ้าคุณรู้วิธีทำงานของสมอง สมองเราไม่ได้ถูกออกแบบมาให้จดจ่อวนไปเป็นชั่วโมงๆ แต่ชอบช่วงเวลาสั้นๆ ที่มีประสิทธิภาพ</p>

      <h3>1. เทคนิค Pomodoro</h3>
      <p>ตั้งเวลาอ่าน 25 นาที พัก 5 นาที ทำวนไป 4 รอบ แล้วพักยาว สูตรนี้ช่วยลดความเครียดและทำให้สมองตื่นตัวตลอดเวลา</p>

      <h3>2. Spaced Repetition (การทบทวนแบบเว้นระยะ)</h3>
      <p>อย่าอ่านอัดทีเดียว ให้แบ่งอ่านซ้ำๆ ในวันที่ 1, 3, 7 และ 30 ความจำระยะสั้นจะเปลี่ยนเป็นความจำระยะยาวโดยอัตโนมัติ</p>
    `,
    coverImage: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=2000',
    category: 'Exam Tactics',
    author: 'Kru Heem',
    publishDate: '25 Jan 2026',
    readTime: '7 min read'
  },
  {
    slug: 'parents-guide-to-homework',
    title: 'เมื่อลูก "เกลียด" การบ้าน: คู่มือผู้ปกครองยุคใหม่',
    excerpt: 'วิธีเปลี่ยนช่วงเวลาสงครามการบ้าน ให้เป็นเวลาคุณภาพของครอบครัว ด้วยหลักจิตวิทยาง่ายๆ',
    content: `
      <h2>อย่าเพิ่งดุ! ฟังลูกก่อน</h2>
      <p>เมื่อลูกบ่นว่าไม่อยากทำการบ้าน สิ่งที่เขาต้องการไม่ใช่คำสั่งสอน แต่คือ "ความเห็นอกเห็นใจ" ลองนั่งลงข้างๆ แล้วถามว่า "ข้อไหนที่หนูว่ายากที่สุด?"</p>
      
      <h3>เทคนิค Sandwich Feedback</h3>
      <p>ชม-ติ-ชม: เริ่มต้นด้วยคำชม (หนูมีความพยายามดีมาก), แนะนำจุดที่ต้องแก้ (ตรงนี้ลองบวกเลขใหม่อีกทีนะ), และจบด้วยคำชม (เก่งมาก เดี๋ยวก็เสร็จแล้ว)</p>
    `,
    coverImage: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=2000',
    category: 'Parent Corner',
    author: 'Kru Heem Team',
    publishDate: '20 Jan 2026',
    readTime: '4 min read'
  },
  {
    slug: 'golden-ratio-in-nature',
    title: 'ความลับของจักรวาล: Golden Ratio ในดอกไม้และงานศิลปะ',
    excerpt: 'สัดส่วนทองคำ 1.618 อยู่ที่ไหนบ้าง? มาดูกันว่าทำไมคณิตศาสตร์ถึงซ่อนอยู่ในความงามของธรรมชาติอย่างน่าอัศจรรย์',
    content: `
      <h2>ทำไมดอกทานตะวันถึงสวย?</h2>
      <p>ถ้าลองนับเกสรดอกทานตะวัน จะพบว่ามันเรียงตัวตามลำดับฟิโบนัชชี (Fibonacci Sequence) ซึ่งมีความสัมพันธ์โดยตรงกับค่า Golden Ratio (Phi ≈ 1.618)</p>
      <p>ธรรมชาติใช้สัดส่วนนี้เพื่อการจัดเรียงที่มีประสิทธิภาพที่สุดในการรับแสงแดด ไม่ใช่เรื่องบังเอิญ แต่คือการออกแบบที่สมบูรณ์แบบของคณิตศาสตร์</p>
    `,
    coverImage: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&q=80&w=2000',
    category: 'Math in Real Life',
    author: 'Science Geek',
    publishDate: '15 Jan 2026',
    readTime: '6 min read'
  }
];
