#include <linux/module.h>
#include <linux/kernel.h>
#include <linux/mm.h>
#include <linux/init.h>
#include <linux/proc_fs.h>
#include <asm/uaccess.h>
#include <linux/seq_file.h>

const long megabyte = 1024 * 1024;

struct sysinfo si;

static void init_meminfo(void) {
   si_meminfo(&si);
}

MODULE_LICENSE("GPL");
MODULE_DESCRIPTION("Modulo de RAM");
MODULE_AUTHOR("Angel");

static int escribir_archivo(struct seq_file *archivo, void *v)
{
    init_meminfo();
    seq_printf(archivo, "%lu", si.freeram);
    return 0;
}


static int al_abrir(struct inode *inode, struct file *file)
{
    return single_open(file, escribir_archivo, NULL);
}

static struct proc_ops operaciones =
{
    .proc_open = al_abrir,
    .proc_read = seq_read
};

static int _insert(void)
{
    proc_create("ram_201800722", 0, NULL, &operaciones);
    printk(KERN_INFO "201800722\n");
    return 0;
}

static void _remove(void)
{
    remove_proc_entry("ram_201800722", NULL);
    printk(KERN_INFO "Laboratorio Sistemas Operativos 1\n");
}

module_init(_insert);
module_exit(_remove);